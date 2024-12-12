import { toast } from 'sonner';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown): void {
  if (error instanceof AppError) {
    toast.error(error.message);
  } else if (error instanceof Error) {
    toast.error(error.message);
    console.error('Unexpected error:', error);
  } else {
    toast.error('An unexpected error occurred');
    console.error('Unknown error:', error);
  }
}

export function isSupabaseError(error: any): boolean {
  return error?.code !== undefined && typeof error?.message === 'string';
}

export function formatSupabaseError(error: any): string {
  if (!isSupabaseError(error)) return 'An unexpected error occurred';

  switch (error.code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address';
    case 'auth/wrong-password':
      return 'Invalid email or password';
    case 'auth/email-already-in-use':
      return 'This email is already registered';
    case '23505': // Unique constraint violation
      return 'This account already exists';
    case 'PGRST116':
      return 'Database access error';
    default:
      return error.message || 'An unexpected error occurred';
  }
}