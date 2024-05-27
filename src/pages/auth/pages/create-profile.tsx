import { Box, Divider, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { profileQueries } from '@/entities/profile';
import { pathKeys } from '@/shared/lib/react-router';

import { CreateProfileForm } from '../ui/create-profile-form';
import { HeadingText } from '../ui/heading-text';

export function CreateProfilePage() {
  const navigate = useNavigate();
  const profile = profileQueries.profileService.getCache();

  if (profile) {
    navigate(pathKeys.root);
  }
  return (
    <Box py={{ base: 4, md: 8 }}>
      <HeadingText>프로필 생성</HeadingText>
      <Text mt={2} color="green.800" textAlign="center" _dark={{ color: 'gray.300' }}>
        추가 정보를 입력해 프로필을 생성해야 합니다.
      </Text>
      <Divider my={4} />
      <CreateProfileForm />
    </Box>
  );
}
