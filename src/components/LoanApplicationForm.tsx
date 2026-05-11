import { AlertCircle } from 'lucide-react';
import { LOAN_TYPES } from '../data/loans';

interface LoanApplicationFormProps {
  loanType: 'HOME' | 'PERSONAL';
  amount: string;
  setAmount: (amount: string) => void;
  term: string;
  setTerm: (term: string) => void;
}

export default function LoanApplicationForm({
  loanType,
  amount,
  setAmount,
  term,
  setTerm,
}: LoanApplicationFormProps) {
  const loanConfig = LOAN_TYPES[loanType];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          max={loanConfig.maxAmount}
        />
        <p className="text-sm text-gray-500 mt-1">
          Max: ${loanConfig.maxAmount}
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Term (months)
        </label>
        <select
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {[3, 6, 12, 24].map((months) => (
            <option key={months} value={months}>
              {months} months
            </option>
          ))}
        </select>
      </div>
      <div className="bg-blue-50 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-blue-600" />
          <p className="text-sm font-medium text-blue-800">Loan Details</p>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Interest Rate: {(loanConfig.interestRate * 100).toFixed(1)}% APR
        </p>
      </div>
    </div>
  );
}
