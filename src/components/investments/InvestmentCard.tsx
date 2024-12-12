import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface InvestmentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  bgColor: string;
  iconColor: string;
  isSelected?: boolean;
}

export default function InvestmentCard({
  title,
  description,
  icon,
  onClick,
  bgColor,
  iconColor,
  isSelected
}: InvestmentCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${bgColor} p-6 rounded-xl text-left relative overflow-hidden group w-full`}
    >
      <motion.div
        className="absolute inset-0 bg-opacity-20 bg-white transform origin-left"
        initial={false}
        animate={{ scaleX: isSelected ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="flex items-start space-x-4">
        <div className={`${iconColor} p-3 rounded-lg`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1 }}
        >
          <ArrowUpRight className={`w-5 h-5 ${iconColor}`} />
        </motion.div>
      </div>
    </motion.button>
  );
}