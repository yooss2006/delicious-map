import { Box, Divider, Text } from '@chakra-ui/react';

import { EditProfileForm } from '../ui/edit-profile-form';
import { HeadingText } from '../ui/heading-text';

export function EditProfilePage() {
  return (
    <Box py={{ base: 4, md: 8 }}>
      <HeadingText>프로필 수정</HeadingText>
      <Text mt={2} color="green.800" textAlign="center" _dark={{ color: 'gray.300' }}>
        회원가입을 환영합니다.
      </Text>
      <Divider my={4} />
      <EditProfileForm />
    </Box>
  );
}
