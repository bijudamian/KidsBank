import React from 'react';
import { motion } from 'framer-motion';
import AccountSummary from './AccountSummary';
import InvestmentOptions from './InvestmentOptions';
import DebtOptions from './DebtOptions';
import TransactionHistory from './TransactionHistory';
import InvestmentCalculator from './calculator/InvestmentCalculator';

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 pb-32"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-blue-600 mb-2">KidsBank</h1>
          <p className="text-gray-600">Learn to grow your wealth! 🚀</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AccountSummary />
          <InvestmentOptions />
          <DebtOptions />
          <TransactionHistory />
        </div>
      </div>
      <InvestmentCalculator />
    </motion.div>
  );
}