import { supabase } from '@/shared/lib';

import { LoginUserDto } from '../types';

export const login = async ({ email, password }: LoginUserDto) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};
