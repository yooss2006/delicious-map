import { Box, Text } from '@chakra-ui/react';

import { HeadingText } from '@/pages/auth/ui/heading-text';

import { CreateGroupForm } from '../ui/create-group-form';

export function CreateGroupPage() {
  return (
    <Box
      w={{ base: '100%', md: '440px' }}
      h="100%"
      py={{ base: 4, md: 8 }}
      background="gray.50"
      _dark={{ background: 'gray.700' }}
    >
      <HeadingText>그룹 생성</HeadingText>
      <Box my={3} color="green.800" textAlign="center" _dark={{ color: 'gray.300' }}>
        <Text>자신만의 그룹을 생성해보세요.</Text>
        <Text>그룹은 수정 및 삭제가 가능합니다.</Text>
      </Box>
      <CreateGroupForm />
    </Box>
  );
}
