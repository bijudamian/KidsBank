import { TrendingUp } from 'lucide-react';

interface CalculatorResultProps {
  returns: number | null;
  profit: number;
}

export default function CalculatorResult({ returns, profit }: CalculatorResultProps) {
  return (
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
  );
}
