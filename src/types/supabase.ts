export interface Database {
  public: {
    Tables: {
      game_states: {
        Row: {
          id: string;
          account: {
            balance: number;
            savings: number;
            emergencyFund: number;
            loans: Array<{
              id: string;
              type: 'HOME' | 'PERSONAL';
              amount: number;
              interestRate: number;
              startDate: string;
              term: number;
              remainingAmount: number;
              monthlyPayment: number;
            }>;
            investments: {
              mutualFunds: Array<{
                id: string;
                amount: number;
                fundType: {
                  id: string;
                  name: string;
                  riskRating: 1 | 2 | 3 | 4 | 5;
                  expectedReturn: number;
                  category: 'Equity' | 'Debt' | 'Hybrid' | 'Index';
                  description: string;
                };
                purchaseDate: string;
                currentValue: number;
              }>;
              fixedDeposits: Array<{
                id: string;
                amount: number;
                interestRate: number;
                startDate: string;
                maturityDate: string;
                type: 'FD';
                term: number;
              }>;
            };
          };
          transactions: Array<{
            id: string;
            type: 'DEPOSIT' | 'WITHDRAW' | 'INVESTMENT' | 'INTEREST' | 'LOAN_PAYMENT' | 'LOAN_DISBURSEMENT';
            amount: number;
            timestamp: string;
            description: string;
            category?: string;
          }>;
          game_time: string;
          speed_multiplier: number;
          created_at?: string;
          updated_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['game_states']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['game_states']['Row']>;
      };
    };
  };
}