import { Box, Flex, Heading } from '@chakra-ui/react';

import { SettingGroupForm } from '../ui/setting-group-form';

export function SettingGroupPage() {
  return (
    <Flex w="440px" h="100%">
      <Box w="100%" h="100%" background="gray.50" _dark={{ background: 'gray.700' }}>
        <Heading
          py={4}
          lineHeight={2}
          as="h2"
          fontSize="xl"
          textAlign="center"
          _dark={{ color: 'gray.200' }}
        >
          그룹 수정
        </Heading>
        <SettingGroupForm />
      </Box>
    </Flex>
  );
}
