import { supabase } from '@/shared/lib';

import { SignUpUserDto } from '../types';

export const signUp = async ({ email, password }: SignUpUserDto) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data.user;
};
