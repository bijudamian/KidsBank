import { BondType } from '../types/game';

export const BONDS: BondType[] = [
  {
    id: 'govt-10y',
    name: '10-Year Government Bond',
    type: 'GOVERNMENT',
    interestRate: 0.065, // 6.5% per year
    term: 120, // 10 years in months
    minInvestment: 100,
    description: 'Long-term government security with guaranteed returns',
    riskRating: 1
  },
  {
    id: 'govt-5y',
    name: '5-Year Government Bond',
    type: 'GOVERNMENT',
    interestRate: 0.055, // 5.5% per year
    term: 60, // 5 years in months
    minInvestment: 100,
    description: 'Medium-term government security with stable returns',
    riskRating: 1
  },
  {
    id: 'corp-aaa',
    name: 'AAA Corporate Bond',
    type: 'CORPORATE',
    interestRate: 0.075, // 7.5% per year
    term: 36, // 3 years in months
    minInvestment: 500,
    description: 'High-grade corporate bond with excellent credit rating',
    riskRating: 2
  },
  {
    id: 'corp-high-yield',
    name: 'High Yield Corporate Bond',
    type: 'CORPORATE',
    interestRate: 0.095, // 9.5% per year
    term: 24, // 2 years in months
    minInvestment: 1000,
    description: 'Higher risk corporate bond with better returns',
    riskRating: 4
  }
];