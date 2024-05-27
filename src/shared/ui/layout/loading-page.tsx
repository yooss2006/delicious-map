import { Box, Progress, Text } from '@chakra-ui/react';

export function LoadingPage() {
  return (
    <Box
      w="100%"
      position="absolute"
      zIndex={10}
      inset={0}
      background="white"
      _dark={{ background: 'black' }}
    >
      <Box
        w="100%"
        maxWidth="200px"
        position="absolute"
        top="40%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Text fontSize={20} fontWeight="900" mb={1} color="green.400">
          Loading
        </Text>
        <Progress isIndeterminate colorScheme="green" w="100%" h="24px" />
      </Box>
    </Box>
  );
}
