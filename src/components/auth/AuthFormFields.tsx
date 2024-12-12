import React from 'react';
import { motion } from 'framer-motion';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface AuthFormFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isSubmitting: boolean;
  isLogin: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onToggleMode: () => void;
}

export default function AuthFormFields({
  register,
  errors,
  isSubmitting,
  isLogin,
  onSubmit,
  onToggleMode
}: AuthFormFieldsProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          {...register('email')}
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message as string}</p>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          </span>
        ) : (
          isLogin ? 'Sign In' : 'Create Account'
        )}
      </motion.button>

      <div className="text-center">
        <button
          type="button"
          onClick={onToggleMode}
          className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none"
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
        </button>
      </div>
    </form>
  );
}