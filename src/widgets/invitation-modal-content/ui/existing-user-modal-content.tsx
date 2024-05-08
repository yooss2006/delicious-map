import { Box, Text, Link as ChakraLink, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function ExistingUserModalContent() {
  return (
    <Box>
      <Text textAlign="center" mb={3}>
        이미 그룹에 가입되어 있습니다.
      </Text>
      <ChakraLink as={Link} to="/">
        <Button w="100%" background="green.400" color="white" _hover={{ background: 'green.600' }}>
          홈으로 가기
        </Button>
      </ChakraLink>
    </Box>
  );
}
