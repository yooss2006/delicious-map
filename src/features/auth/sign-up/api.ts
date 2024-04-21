import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { SignUpFormValues } from '@/entities/auth';
import { useParsedLocation } from '@/shared/hooks';
import { supabase } from '@/shared/lib';

type SignUpValues = Omit<SignUpFormValues, 'profileImage'> & { profileImage: string };

export const signUp = async ({
  email,
  password,
  nickname,
  profileImage,
  nexturl,
}: SignUpValues & { nexturl?: string }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: nickname, avatar_url: profileImage },
      ...(nexturl && { emailRedirectTo: `${import.meta.env.VITE_BASE_URL}/invitation${nexturl}` }),
    },
  });
  if (error) {
    throw error;
  }
  return data;
};

export const useSignUp = () => {
  const navigate = useNavigate();
  const { query } = useParsedLocation();
  const nexturl = query.nexturl;

  return useMutation({
    mutationFn: (params: SignUpValues) => signUp({ ...params, nexturl }),
    onSuccess() {
      navigate(`/auth/login${nexturl ? `?nexturl=${nexturl}` : ''}`);
    },
  });
};
