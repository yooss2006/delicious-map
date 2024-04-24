import { Box, Divider, Heading, Text } from '@chakra-ui/react';

import { EditProfileForm } from '@/widgets/auth-form';

export function EditProfilePage() {
  return (
    <Box>
      <Heading as="h2" size="xl" textAlign="center" color="green.50" _dark={{ color: 'gray.200' }}>
        프로필 수정
      </Heading>
      <Text mt={2} color="green.800" textAlign="center" _dark={{ color: 'gray.300' }}>
        회원가입을 환영합니다.
      </Text>
      <Divider my={4} />
      <EditProfileForm />
    </Box>
  );
}
