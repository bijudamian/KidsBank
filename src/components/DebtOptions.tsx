import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Home, CreditCard, AlertCircle } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { LOAN_TYPES } from '../data/loans';
import InvestmentDialog from './InvestmentDialog';
import { toast } from 'sonner';

type LoanType = 'HOME' | 'PERSONAL';

export default function DebtOptions() {
  const { takeLoan, account } = useGameStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loanType, setLoanType] = useState<LoanType>('HOME');
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('12');

  const handleLoan = useCallback(() => {
    const loanAmount = parseFloat(amount);
    const loanTerm = parseInt(term);
    const loanConfig = LOAN_TYPES[loanType];

    if (isNaN(loanAmount) || loanAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (loanAmount > loanConfig.maxAmount) {
      toast.error(`Maximum loan amount is $${loanConfig.maxAmount}`);
      return;
    }

    try {
      takeLoan(loanType, loanAmount, loanTerm);
      toast.success('Loan approved successfully');
      setIsDialogOpen(false);
      setAmount('');
    } catch (error) {
      toast.error('Failed to process loan request');
    }
  }, [loanType, amount, term]);

  const renderLoanDialog = () => (
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
          max={LOAN_TYPES[loanType].maxAmount}
        />
        <p className="text-sm text-gray-500 mt-1">
          Max: ${LOAN_TYPES[loanType].maxAmount}
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
          Interest Rate: {(LOAN_TYPES[loanType].interestRate * 100).toFixed(1)}% APR
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Loans</h2>

      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-orange-50 rounded-lg text-center relative overflow-hidden group"
          onClick={() => {
            setLoanType('HOME');
            setIsDialogOpen(true);
          }}
        >
          <Home className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <p className="font-semibold text-orange-700">Home Loan</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-pink-50 rounded-lg text-center relative overflow-hidden group"
          onClick={() => {
            setLoanType('PERSONAL');
            setIsDialogOpen(true);
          }}
        >
          <CreditCard className="w-8 h-8 text-pink-500 mx-auto mb-2" />
          <p className="font-semibold text-pink-700">Personal Loan</p>
        </motion.button>
      </div>

      <InvestmentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={`Apply for ${loanType.toLowerCase()} loan`}
        onConfirm={handleLoan}
        confirmText="Apply"
      >
        {renderLoanDialog()}
      </InvestmentDialog>
    </motion.div>
  );
}