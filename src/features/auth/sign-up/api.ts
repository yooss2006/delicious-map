import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { SignUpFormValues } from '@/entities/auth';
import { supabase } from '@/shared/lib';

export const signUp = async ({
  email,
  password,
  nickname,
  profileImage,
}: Omit<SignUpFormValues, 'profileImage'> & { profileImage: string }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname, profile_image: profileImage },
    },
  });
  if (error) {
    throw error;
  }
  return data;
};

export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUp,
    onSuccess(data) {
      navigate('/auth/email-verification', { replace: true, state: { email: data?.user?.email } });
    },
  });
};
