import { useToast } from '@chakra-ui/react';
import { Provider } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useParsedLocation } from '@/shared/hooks';
import { queryClient, queryKey, supabase } from '@/shared/lib';

import { LoginUserDto, SignUpUserDto } from './type';

export const loginUser = async ({ email, password }: LoginUserDto) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const useLoginUser = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { query } = useParsedLocation();
  const nextUrl = query.nextUrl;

  return useMutation({
    mutationFn: loginUser,
    onSuccess() {
      navigate(nextUrl || '/');
      queryClient.invalidateQueries({ queryKey: queryKey.currentUser });
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

export const signUpUser = async ({ email, password }: SignUpUserDto) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data.user;
};

export const oAuthLoginUser = async (provider: Provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${import.meta.env.VITE_BASE_URL}/auth/create-profile`,
      skipBrowserRedirect: false,
    },
  });

  if (error) {
    throw error;
  }

  return data;
};

export const getCurrentUser = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  return user;
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess() {
      window.location.href = '/';
    },
  });
};
