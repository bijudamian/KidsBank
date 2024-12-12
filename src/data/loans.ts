export const LOAN_TYPES = {
  HOME: {
    maxAmount: 500,
    interestRate: 0.07, // 7% per year
    maxTerm: 12, // months
    minDownPayment: 0.20 // 20%
  },
  PERSONAL: {
    maxAmount: 200,
    interestRate: 0.12, // 12% per year
    maxTerm: 6, // months
    minDownPayment: 0
  }
};