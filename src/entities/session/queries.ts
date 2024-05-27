import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { profileQueries } from '@/entities/profile';
import { useParsedLocation } from '@/shared/hooks';
import { pathKeys } from '@/shared/lib/react-router';

import { login, signUp } from './api';
import { logout } from './api/logout';
import { oAuthLogin } from './api/oauth-login';

export const useOauthLoginMutation = () => {
  return useMutation({
    mutationFn: oAuthLogin,
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

export const useLoginMutation = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { query } = useParsedLocation();
  const nextUrl = query.nextUrl;

  return useMutation({
    mutationFn: login,
    onSuccess() {
      navigate(nextUrl || pathKeys.root);
      profileQueries.profileService.invalidateQueries();
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

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess() {
      window.location.href = pathKeys.root;
    },
  });
};
