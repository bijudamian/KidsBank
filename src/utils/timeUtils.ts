import { addDays, addMonths } from 'date-fns';

export const GAME_MONTH = 1000 * 60; // 1 minute real time = 1 month game time

export function getGameTime(startTime: Date, currentTime: Date, speedMultiplier: number): Date {
  const elapsedRealMs = currentTime.getTime() - startTime.getTime();
  const elapsedGameMs = elapsedRealMs * speedMultiplier;
  return addDays(startTime, elapsedGameMs / (1000 * 60 * 60 * 24));
}

export function calculateMonthlyPayment(principal: number, annualRate: number, months: number): number {
  const monthlyRate = annualRate / 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
}