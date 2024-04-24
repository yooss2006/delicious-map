import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useProfile } from '@/entities/profile';
import { LoadingPage } from '@/shared/ui/layout';
import { CreateProfileForm } from '@/widgets/auth-form';

export function CreateProfilePage() {
  const { data: profile, isLoading } = useProfile();
  const navigate = useNavigate();

  if (isLoading) return <LoadingPage />;
  if (profile) {
    navigate('/');
  }
  return (
    <Box>
      <Heading as="h2" size="xl" textAlign="center" color="green.50" _dark={{ color: 'gray.200' }}>
        프로필 생성
      </Heading>
      <Text mt={2} color="green.800" textAlign="center" _dark={{ color: 'gray.300' }}>
        추가 정보를 입력해 프로필을 생성해야 합니다.
      </Text>
      <Divider my={4} />
      <CreateProfileForm />
    </Box>
  );
}
