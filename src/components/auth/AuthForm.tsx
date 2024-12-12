import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';
import { PiggyBank } from 'lucide-react';
import AuthFormFields from './AuthFormFields';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AuthFormData = z.infer<typeof authSchema>;

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp } = useAuthStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      if (isLogin) {
        await signIn(data.email, data.password);
        toast.success('Welcome back to KidsBank! 🎉');
      } else {
        await signUp(data.email, data.password);
        toast.success('Account created successfully! 🎈');
      }
    } catch (error) {
      toast.error(isLogin ? 'Invalid credentials' : 'Could not create account');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="inline-block mb-4"
            >
              <PiggyBank className="w-16 h-16 text-blue-500" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-800">KidsBank</h1>
            <p className="text-gray-600 mt-2">Start your financial journey! 🚀</p>
          </div>

          <AuthFormFields
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            isLogin={isLogin}
            onSubmit={handleSubmit(onSubmit)}
            onToggleMode={() => setIsLogin(!isLogin)}
          />

          {/* Demo Account Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Demo Account:</strong><br />
              Email: demo@kidsbank.com<br />
              Password: demo123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}