import React from 'react';
import { motion } from 'framer-motion';
import { PiggyBank, TrendingUp, Wallet } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export default function AccountSummary() {
  const { account } = useGameStore();

  const totalInvestments = 
    account.investments.mutualFunds.reduce((acc, mf) => acc + mf.currentValue, 0) +
    account.investments.fixedDeposits.reduce((acc, fd) => acc + fd.amount, 0);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Summary</h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <Wallet className="w-8 h-8 text-green-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Available Balance</p>
            <p className="text-xl font-bold">${account.balance.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center">
          <PiggyBank className="w-8 h-8 text-blue-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Savings</p>
            <p className="text-xl font-bold">${account.savings.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center">
          <TrendingUp className="w-8 h-8 text-purple-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Total Investments</p>
            <p className="text-xl font-bold">${totalInvestments.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}