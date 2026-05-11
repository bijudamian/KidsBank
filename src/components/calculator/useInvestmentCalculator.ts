import { useState, useCallback } from 'react';
import { MUTUAL_FUNDS } from '../../data/mutualFunds.ts';
import { BONDS } from '../../data/bonds.ts';
import { FD_OPTIONS } from '../../data/fixedDeposits.ts';

export type InvestmentType = 'FD' | 'MF' | 'BOND';

export const FD_MAP = new Map(FD_OPTIONS.map(fd => [fd.term.toString(), fd]));
export const MF_MAP = new Map(MUTUAL_FUNDS.map(mf => [mf.id, mf]));
export const BOND_MAP = new Map(BONDS.map(bond => [bond.id, bond]));

export function useInvestmentCalculator() {
  const [amount, setAmount] = useState('1000');
  const [years, setYears] = useState('1');
  const [investmentType, setInvestmentType] = useState<InvestmentType>('FD');
  const [selectedOption, setSelectedOption] = useState('');

  const calculateReturns = useCallback(() => {
    const principal = parseFloat(amount);
    const timeInYears = parseFloat(years);

    if (isNaN(principal) || isNaN(timeInYears)) return null;

    switch (investmentType) {
      case 'FD': {
        const option = FD_MAP.get(selectedOption);
        if (!option) return null;
        const interest = option.interestRate;
        return principal * Math.pow(1 + interest, timeInYears);
      }
      case 'MF': {
        const fund = MF_MAP.get(selectedOption);
        if (!fund) return null;
        return principal * Math.pow(1 + fund.expectedReturn, timeInYears);
      }
      case 'BOND': {
        const bond = BOND_MAP.get(selectedOption);
        if (!bond) return null;
        return principal * (1 + (bond.interestRate * timeInYears));
      }
      default:
        return null;
    }
  }, [amount, years, investmentType, selectedOption]);

  const returns = calculateReturns();
  const profit = returns ? returns - parseFloat(amount) : 0;

  return {
    amount,
    setAmount,
    years,
    setYears,
    investmentType,
    setInvestmentType,
    selectedOption,
    setSelectedOption,
    returns,
    profit
  };
}
