import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Account, GameState, Transaction, MutualFundInvestment, Loan } from '../types/game';
import { MUTUAL_FUNDS } from '../data/mutualFunds';
import { FD_OPTIONS } from '../data/fixedDeposits';
import { LOAN_TYPES } from '../data/loans';
import { calculateMonthlyPayment } from '../utils/timeUtils';
import { startOfDay, isSameDay } from 'date-fns';

interface GameStore extends GameState {
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
  createFD: (amount: number, term: number) => void;
  investInMF: (amount: number, fundId: string) => void;
  addToEmergencyFund: (amount: number) => void;
  takeLoan: (type: 'HOME' | 'PERSONAL', amount: number, term: number) => void;
  processTimeUpdate: (currentGameTime: Date) => void;
  lastProcessedDay: Date | null;
}

const INITIAL_STATE: GameState & { lastProcessedDay: Date | null } = {
  account: {
    balance: 1000, // Starting with more money for better gameplay
    savings: 0,
    emergencyFund: 0,
    loans: [],
    investments: {
      mutualFunds: [],
      fixedDeposits: []
    }
  },
  transactions: [],
  gameTime: new Date(),
  speedMultiplier: 30 * 24, // 1 real second = 1 game month
  lastProcessedDay: null
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      deposit: (amount: number) => {
        if (amount <= 0) return;
        
        set((state) => ({
          account: {
            ...state.account,
            balance: state.account.balance + amount
          },
          transactions: [
            {
              id: crypto.randomUUID(),
              type: 'DEPOSIT',
              amount,
              timestamp: new Date(),
              description: 'Cash Deposit'
            },
            ...state.transactions
          ]
        }));
      },

      withdraw: (amount: number) => {
        const { account } = get();
        if (amount <= 0 || account.balance < amount) return;

        set((state) => ({
          account: {
            ...state.account,
            balance: state.account.balance - amount
          },
          transactions: [
            {
              id: crypto.randomUUID(),
              type: 'WITHDRAW',
              amount: -amount,
              timestamp: new Date(),
              description: 'Cash Withdrawal'
            },
            ...state.transactions
          ]
        }));
      },

      createFD: (amount: number, term: number) => {
        const { account } = get();
        if (amount <= 0 || account.balance < amount) return;

        const fdOption = FD_OPTIONS.find(fd => fd.term === term);
        if (!fdOption) return;

        set((state) => ({
          account: {
            ...state.account,
            balance: state.account.balance - amount,
            investments: {
              ...state.account.investments,
              fixedDeposits: [
                {
                  id: crypto.randomUUID(),
                  amount,
                  interestRate: fdOption.interestRate,
                  startDate: new Date(),
                  maturityDate: new Date(Date.now() + term * 30 * 24 * 60 * 60 * 1000),
                  type: 'FD',
                  term
                },
                ...state.account.investments.fixedDeposits
              ]
            }
          },
          transactions: [
            {
              id: crypto.randomUUID(),
              type: 'INVESTMENT',
              amount: -amount,
              timestamp: new Date(),
              description: `Created ${term}-month Fixed Deposit`
            },
            ...state.transactions
          ]
        }));
      },

      investInMF: (amount: number, fundId: string) => {
        const { account } = get();
        const fund = MUTUAL_FUNDS.find(f => f.id === fundId);
        if (!fund || amount <= 0 || account.balance < amount) return;

        set((state) => ({
          account: {
            ...state.account,
            balance: state.account.balance - amount,
            investments: {
              ...state.account.investments,
              mutualFunds: [
                {
                  id: crypto.randomUUID(),
                  amount,
                  fundType: fund,
                  purchaseDate: new Date(),
                  currentValue: amount
                },
                ...state.account.investments.mutualFunds
              ]
            }
          },
          transactions: [
            {
              id: crypto.randomUUID(),
              type: 'INVESTMENT',
              amount: -amount,
              timestamp: new Date(),
              description: `Invested in ${fund.name}`
            },
            ...state.transactions
          ]
        }));
      },

      addToEmergencyFund: (amount: number) => {
        const { account } = get();
        if (amount <= 0 || account.balance < amount) return;

        set((state) => ({
          account: {
            ...state.account,
            balance: state.account.balance - amount,
            emergencyFund: state.account.emergencyFund + amount
          },
          transactions: [
            {
              id: crypto.randomUUID(),
              type: 'WITHDRAW',
              amount: -amount,
              timestamp: new Date(),
              description: 'Added to Emergency Fund'
            },
            ...state.transactions
          ]
        }));
      },

      takeLoan: (type: 'HOME' | 'PERSONAL', amount: number, term: number) => {
        const loanConfig = LOAN_TYPES[type];
        if (!loanConfig || amount > loanConfig.maxAmount || term > loanConfig.maxTerm) return;

        const monthlyPayment = calculateMonthlyPayment(amount, loanConfig.interestRate, term);

        set((state) => ({
          account: {
            ...state.account,
            balance: state.account.balance + amount,
            loans: [
              {
                id: crypto.randomUUID(),
                type,
                amount,
                interestRate: loanConfig.interestRate,
                startDate: new Date(),
                term,
                remainingAmount: amount,
                monthlyPayment
              },
              ...state.account.loans
            ]
          },
          transactions: [
            {
              id: crypto.randomUUID(),
              type: 'LOAN_DISBURSEMENT',
              amount,
              timestamp: new Date(),
              description: `${type} Loan Disbursement`
            },
            ...state.transactions
          ]
        }));
      },

      processTimeUpdate: (currentGameTime: Date) => {
        const state = get();
        const currentDay = startOfDay(currentGameTime);
        
        if (state.lastProcessedDay && isSameDay(state.lastProcessedDay, currentDay)) {
          return;
        }

        set((state) => {
          const updatedMFs = state.account.investments.mutualFunds.map(mf => ({
            ...mf,
            currentValue: mf.currentValue * (1 + mf.fundType.expectedReturn / 365)
          }));

          const { updatedLoans, totalPayment } = state.account.loans.reduce(
            (acc, loan) => {
              if (loan.remainingAmount <= 0) return acc;
              
              const updatedLoan = {
                ...loan,
                remainingAmount: Math.max(0, loan.remainingAmount - (loan.monthlyPayment / 30))
              };

              return {
                updatedLoans: [...acc.updatedLoans, updatedLoan],
                totalPayment: acc.totalPayment + (loan.monthlyPayment / 30)
              };
            },
            { updatedLoans: [], totalPayment: 0 } as { updatedLoans: Loan[], totalPayment: number }
          );

          return {
            account: {
              ...state.account,
              balance: state.account.balance - totalPayment,
              investments: {
                ...state.account.investments,
                mutualFunds: updatedMFs
              },
              loans: updatedLoans
            },
            lastProcessedDay: currentDay
          };
        });
      }
    }),
    {
      name: 'game-store',
      version: 1,
    }
  )
);