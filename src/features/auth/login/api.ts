import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { LoginFormValues } from '@/entities/auth';
import { queryClient, supabase } from '@/shared/lib';

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

export const useLogin = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: login,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['current_user'] });
    },
    onError(error) {
      if (error.message === 'Invalid login credentials') {
        toast({
          title: '이메일 또는 비밀번호가 일치하지 않습니다.',
          position: 'top',
          status: 'error',
        });
      }
      if (error.message === 'Email not confirmed') {
        toast({
          title: '이메일 인증이 필요합니다. 이메일을 확인해주세요.',
          position: 'top',
          status: 'error',
        });
      }
    },
  });
};
