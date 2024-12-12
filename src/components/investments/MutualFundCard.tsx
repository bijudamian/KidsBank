import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star } from 'lucide-react';
import { MutualFundType } from '../../types/game';

interface MutualFundCardProps {
  fund: MutualFundType;
  isSelected: boolean;
  onSelect: () => void;
}

export default function MutualFundCard({ fund, isSelected, onSelect }: MutualFundCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`w-full p-4 rounded-xl text-left relative overflow-hidden transition-colors ${
        isSelected ? 'bg-purple-100' : 'bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className={`w-5 h-5 ${isSelected ? 'text-purple-600' : 'text-gray-600'}`} />
            <h3 className="font-semibold text-gray-800">{fund.name}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">{fund.description}</p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Risk Level:</span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < fund.riskRating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill={i < fund.riskRating ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-green-600">
            {(fund.expectedReturn * 100).toFixed(1)}% APY
          </p>
          <p className="text-sm text-gray-500">{fund.category}</p>
        </div>
      </div>
    </motion.button>
  );
}