import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { format } from 'date-fns';
import { Transaction } from '../types/game';

const TransactionItem = React.memo(({ transaction }: { transaction: Transaction }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
  >
    <div className="flex items-center">
      {transaction.amount > 0 ? (
        <ArrowUpRight className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
      ) : (
        <ArrowDownRight className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
      )}
      <div className="min-w-0">
        <p className="font-medium truncate">{transaction.description}</p>
        <p className="text-sm text-gray-500">
          {format(new Date(transaction.timestamp), 'MMM d, yyyy HH:mm')}
        </p>
      </div>
    </div>
    <p className={`font-bold ml-4 flex-shrink-0 ${
      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
    }`}>
      ${Math.abs(transaction.amount).toFixed(2)}
    </p>
  </motion.div>
));

TransactionItem.displayName = 'TransactionItem';

export default function TransactionHistory() {
  const transactions = useGameStore((state) => state.transactions);
  const recentTransactions = transactions.slice(-5).reverse();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 py-4"
            >
              No recent transactions
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}