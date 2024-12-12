// Add these types to the existing file

export interface BondType {
  id: string;
  name: string;
  type: 'GOVERNMENT' | 'CORPORATE';
  interestRate: number;
  term: number; // in months
  minInvestment: number;
  description: string;
  riskRating: 1 | 2 | 3 | 4 | 5;
}

export interface BondInvestment {
  id: string;
  bondType: BondType;
  amount: number;
  purchaseDate: Date;
  maturityDate: Date;
}