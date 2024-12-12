import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp } from 'lucide-react';
import { MUTUAL_FUNDS } from '../../data/mutualFunds';
import { BONDS } from '../../data/bonds';
import { FD_OPTIONS } from '../../data/fixedDeposits';

type InvestmentType = 'FD' | 'MF' | 'BOND';

export default function InvestmentCalculator() {
  const [amount, setAmount] = useState('1000');
  const [years, setYears] = useState('1');
  const [investmentType, setInvestmentType] = useState<InvestmentType>('FD');
  const [selectedOption, setSelectedOption] = useState('');

  const calculateReturns = useCallback(() => {
    const principal = parseFloat(amount);
    const timeInYears = parseFloat(years);
    
    if (isNaN(principal) || isNaN(timeInYears)) return null;

    switch (investmentType) {
      case 'FD': {
        const option = FD_OPTIONS.find(fd => fd.term.toString() === selectedOption);
        if (!option) return null;
        const interest = option.interestRate;
        return principal * Math.pow(1 + interest, timeInYears);
      }
      case 'MF': {
        const fund = MUTUAL_FUNDS.find(f => f.id === selectedOption);
        if (!fund) return null;
        return principal * Math.pow(1 + fund.expectedReturn, timeInYears);
      }
      case 'BOND': {
        const bond = BONDS.find(b => b.id === selectedOption);
        if (!bond) return null;
        return principal * (1 + (bond.interestRate * timeInYears));
      }
      default:
        return null;
    }
  }, [amount, years, investmentType, selectedOption]);

  const returns = calculateReturns();
  const profit = returns ? returns - parseFloat(amount) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Investment Calculator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              max="30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={investmentType}
              onChange={(e) => {
                setInvestmentType(e.target.value as InvestmentType);
                setSelectedOption('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="FD">Fixed Deposit</option>
              <option value="MF">Mutual Fund</option>
              <option value="BOND">Bond</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Option
            </label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              {investmentType === 'FD' && FD_OPTIONS.map(fd => (
                <option key={fd.term} value={fd.term}>
                  {fd.term} months ({(fd.interestRate * 100).toFixed(1)}% APY)
                </option>
              ))}
              {investmentType === 'MF' && MUTUAL_FUNDS.map(fund => (
                <option key={fund.id} value={fund.id}>
                  {fund.name} ({(fund.expectedReturn * 100).toFixed(1)}% APY)
                </option>
              ))}
              {investmentType === 'BOND' && BONDS.map(bond => (
                <option key={bond.id} value={bond.id}>
                  {bond.name} ({(bond.interestRate * 100).toFixed(1)}% APY)
                </option>
              ))}
            </select>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <p className="text-sm font-medium text-blue-800">Expected Returns</p>
            </div>
            {returns ? (
              <>
                <p className="text-lg font-bold text-blue-900">
                  ${returns.toFixed(2)}
                </p>
                <p className={`text-sm ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {profit >= 0 ? '+' : ''}{profit.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500">Select all options</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}