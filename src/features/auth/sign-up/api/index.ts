import { supabase } from '@/shared/lib';

export interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const signUp = async ({ email, password }: SignUpFormValues) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data;
};
