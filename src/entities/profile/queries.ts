import { useToast } from '@chakra-ui/react';
import { queryOptions, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { queryClient } from '@/shared/lib';
import { pathKeys } from '@/shared/lib/react-router';

import { editProfileByEmail, createProfile, getProfile } from './api';
import { Profile } from './types';

const keys = {
  root: () => ['profile'] as const,
};

export const profileService = {
  queryKey: () => keys.root(),
  queryOptions: () => {
    const queryKey = keys.root();
    return queryOptions({
      queryKey,
      queryFn: getProfile,
      refetchOnWindowFocus: false,
      retry: false,
    });
  },
  getCache: () => queryClient.getQueryData<Profile>(profileService.queryKey()),
  setCache: (data: Profile) => queryClient.setQueryData(profileService.queryKey(), data),
  invalidateQueries: () => queryClient.invalidateQueries({ queryKey: profileService.queryKey() }),
};
export const useCreateProfileMutation = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      toast({ title: '회원가입이 완료되었습니다.', position: 'top', status: 'success' });
      navigate(pathKeys.auth.login());
    },
  });
};

export const useEditProfileMutation = () => {
  const toast = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: editProfileByEmail,
    onSuccess: async (data) => {
      await profileService.setCache(data);
      toast({ title: '프로필 변경이 완료되었습니다.', position: 'top', status: 'success' });
      navigate(pathKeys.root);
    },
  });
};
