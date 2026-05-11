import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface LoanCardProps {
  type: string;
  title: string;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  onClick: () => void;
}

export default function LoanCard({
  title,
  icon: Icon,
  colorClass,
  bgClass,
  onClick,
}: LoanCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 ${bgClass} rounded-lg text-center relative overflow-hidden group`}
      onClick={onClick}
    >
      <Icon className={`w-8 h-8 ${colorClass} mx-auto mb-2`} />
      <p className={`font-semibold ${colorClass.replace('500', '700')}`}>{title}</p>
    </motion.button>
  );
}
