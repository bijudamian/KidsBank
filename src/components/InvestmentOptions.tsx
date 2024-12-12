import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Banknote, LineChart, Landmark } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { MUTUAL_FUNDS } from '../data/mutualFunds';
import { BONDS } from '../data/bonds';
import { toast } from 'sonner';
import InvestmentDialog from './InvestmentDialog';

type InvestmentType = 'FD' | 'MF' | 'BOND';

export default function InvestmentOptions() {
  const { createFD, investInMF, investInBond, account } = useGameStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [investmentType, setInvestmentType] = useState<InvestmentType>('FD');
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('3');
  const [selectedFund, setSelectedFund] = useState(MUTUAL_FUNDS[0].id);
  const [selectedBond, setSelectedBond] = useState(BONDS[0].id);

  const handleInvestment = useCallback(() => {
    const investmentAmount = parseFloat(amount);
    
    if (isNaN(investmentAmount) || investmentAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (investmentAmount > account.balance) {
      toast.error('Insufficient balance');
      return;
    }

    try {
      switch (investmentType) {
        case 'FD':
          createFD(investmentAmount, parseInt(months));
          toast.success('Fixed deposit created successfully');
          break;
        case 'MF':
          investInMF(investmentAmount, selectedFund);
          toast.success('Mutual fund investment successful');
          break;
        case 'BOND':
          investInBond(investmentAmount, selectedBond);
          toast.success('Bond purchased successfully');
          break;
      }
      setIsDialogOpen(false);
      setAmount('');
    } catch (error) {
      toast.error('Investment failed. Please try again.');
    }
  }, [amount, investmentType, months, selectedFund, selectedBond, account.balance]);

  const renderInvestmentDialog = () => {
    switch (investmentType) {
      case 'FD':
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Term
              </label>
              <select
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
              </select>
            </div>
          </div>
        );
      case 'MF':
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Fund
              </label>
              <select
                value={selectedFund}
                onChange={(e) => setSelectedFund(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {MUTUAL_FUNDS.map(fund => (
                  <option key={fund.id} value={fund.id}>
                    {fund.name} ({(fund.expectedReturn * 100).toFixed(1)}% APY)
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      case 'BOND':
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Bond
              </label>
              <select
                value={selectedBond}
                onChange={(e) => setSelectedBond(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {BONDS.map(bond => (
                  <option key={bond.id} value={bond.id}>
                    {bond.name} ({(bond.interestRate * 100).toFixed(1)}% APY)
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Investments</h2>

      <div className="grid grid-cols-3 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-blue-50 rounded-lg text-center relative overflow-hidden group"
          onClick={() => {
            setInvestmentType('FD');
            setIsDialogOpen(true);
          }}
        >
          <Banknote className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="font-semibold text-blue-700">Fixed Deposit</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-purple-50 rounded-lg text-center relative overflow-hidden group"
          onClick={() => {
            setInvestmentType('MF');
            setIsDialogOpen(true);
          }}
        >
          <LineChart className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="font-semibold text-purple-700">Mutual Fund</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-green-50 rounded-lg text-center relative overflow-hidden group"
          onClick={() => {
            setInvestmentType('BOND');
            setIsDialogOpen(true);
          }}
        >
          <Landmark className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="font-semibold text-green-700">Bonds</p>
        </motion.button>
      </div>

      <InvestmentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={`${investmentType === 'FD' ? 'Create Fixed Deposit' : 
               investmentType === 'MF' ? 'Invest in Mutual Fund' : 
               'Purchase Bond'}`}
        onConfirm={handleInvestment}
      >
        {renderInvestmentDialog()}
      </InvestmentDialog>
    </motion.div>
  );
}