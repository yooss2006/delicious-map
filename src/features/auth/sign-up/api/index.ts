import { supabase } from '@/shared/lib';

export interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword?: string;
  nickname: string;
}

export const signUp = async ({ email, password, nickname }: SignUpFormValues) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname },
    },
  });
  if (error) {
    throw error;
  }
  return data;
};
