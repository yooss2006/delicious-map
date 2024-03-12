import { supabase } from '@/shared/lib';

export interface LoginFormValues {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginFormValues) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data;
};
