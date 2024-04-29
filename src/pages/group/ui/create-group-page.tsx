import { Box, Heading } from '@chakra-ui/react';

import { CreateGroupForm } from '@/widgets/group-form';

export function CreateGroupPage() {
  return (
    <Box w="440px" h="100%" background="gray.50" _dark={{ background: 'gray.700' }}>
      <Heading
        py={4}
        lineHeight={2}
        as="h2"
        fontSize="xl"
        textAlign="center"
        _dark={{ color: 'gray.200' }}
      >
        그룹 생성
      </Heading>
      <CreateGroupForm />
    </Box>
  );
}
