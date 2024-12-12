import { MutualFundType } from '../types/game';

export const MUTUAL_FUNDS: MutualFundType[] = [
  {
    id: 'kids-index-fund',
    name: 'KidsBank Index Fund',
    riskRating: 2,
    expectedReturn: 0.10,
    category: 'Index',
    description: 'A safe way to track the overall market performance'
  },
  {
    id: 'growth-stars',
    name: 'Growth Stars',
    riskRating: 4,
    expectedReturn: 0.15,
    category: 'Equity',
    description: 'High-growth companies with strong potential'
  },
  {
    id: 'safe-debt',
    name: 'Safe & Steady Debt Fund',
    riskRating: 1,
    expectedReturn: 0.07,
    category: 'Debt',
    description: 'Very safe investment in government bonds'
  },
  {
    id: 'balanced-wealth',
    name: 'Balanced Wealth Builder',
    riskRating: 3,
    expectedReturn: 0.12,
    category: 'Hybrid',
    description: 'Mix of safe and growth investments'
  }
];