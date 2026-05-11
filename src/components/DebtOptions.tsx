import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Home, CreditCard } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { LOAN_TYPES } from '../data/loans';
import InvestmentDialog from './InvestmentDialog';
import LoanCard from './LoanCard';
import LoanApplicationForm from './LoanApplicationForm';
import { toast } from 'sonner';

type LoanType = 'HOME' | 'PERSONAL';

export default function DebtOptions() {
  const { takeLoan } = useGameStore();
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
    } catch {
      toast.error('Failed to process loan request');
    }
  }, [loanType, amount, term, takeLoan]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Loans</h2>
      <div className="grid grid-cols-2 gap-4">
        <LoanCard
          type="HOME"
          title="Home Loan"
          icon={Home}
          colorClass="text-orange-500"
          bgClass="bg-orange-50"
          onClick={() => {
            setLoanType('HOME');
            setIsDialogOpen(true);
          }}
        />
        <LoanCard
          type="PERSONAL"
          title="Personal Loan"
          icon={CreditCard}
          colorClass="text-pink-500"
          bgClass="bg-pink-50"
          onClick={() => {
            setLoanType('PERSONAL');
            setIsDialogOpen(true);
          }}
        />
      </div>

      <InvestmentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={`Apply for ${loanType.toLowerCase()} loan`}
        onConfirm={handleLoan}
        confirmText="Apply"
      >
        <LoanApplicationForm
          loanType={loanType}
          amount={amount}
          setAmount={setAmount}
          term={term}
          setTerm={setTerm}
        />
      </InvestmentDialog>
    </motion.div>
  );
}
