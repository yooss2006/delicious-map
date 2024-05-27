import { Box, Text, Button } from '@chakra-ui/react';

import { pathKeys } from '@/shared/lib/react-router';
import { Link } from '@/shared/ui/link';

export function ExistingUserModalContent() {
  return (
    <Box>
      <Text textAlign="center" mb={3}>
        이미 그룹에 가입되어 있습니다.
      </Text>
      <Link as={Link} to={pathKeys.root}>
        <Button w="100%" background="green.400" color="white" _hover={{ background: 'green.600' }}>
          홈으로 가기
        </Button>
      </Link>
    </Box>
  );
}
