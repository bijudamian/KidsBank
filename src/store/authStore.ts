import { create } from 'zustand';
import { supabase } from '../lib/supabase.ts';
import { User } from '@supabase/supabase-js';
import { AppError, handleError, formatSupabaseError } from '../utils/errorUtils.ts';
import { Database } from '../types/supabase.ts';
interface AuthState {
  user: User | null;
  session: unknown;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
const INITIAL_GAME_STATE: Database['public']['Tables']['game_states']['Insert'] = {
  account: {
    balance: 100,
    savings: 0,
    emergencyFund: 0,
    loans: [],
    investments: {
      mutualFunds: [],
      fixedDeposits: []
    }
  },
  transactions: [],
  game_time: new Date().toISOString(),
  speed_multiplier: 720 // 1 second = 1 month
};
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new AppError(formatSupabaseError(error), error.code);
      set({ user: data.user, session: data.session });
      // Initialize game state for new users
      const { error: gameStateError } = await supabase
        .from('game_states')
        .upsert([{
          id: data.user.id,
          ...INITIAL_GAME_STATE
        }]);
      if (gameStateError) {
        console.error('Error initializing game state:', gameStateError);
        throw new AppError('Failed to initialize game state', gameStateError.code);
      }
    } catch (_error) {
      handleError(error);
      throw error;
    }
  },
  signUp: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw new AppError(formatSupabaseError(error), error.code);
      set({ user: data.user, session: data.session });
      if (data.user) {
        const { error: gameStateError } = await supabase
          .from('game_states')
          .insert([{
            id: data.user.id,
            ...INITIAL_GAME_STATE
          }]);
        if (gameStateError) {
          console.error('Error creating game state:', gameStateError);
          throw new AppError('Failed to create game state', gameStateError.code);
        }
      }
    } catch (_error) {
      handleError(error);
      throw error;
    }
  },
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new AppError(formatSupabaseError(error), error.code);
      set({ user: null, session: null });
    } catch (_error) {
      handleError(error);
      throw error;
    }
  },
}));
// Initialize auth state
supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.setState({
    user: session?.user ?? null,
    session,
    loading: false,
  });
});