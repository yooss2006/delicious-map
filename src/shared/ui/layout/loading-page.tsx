import { Box, Progress, Text } from '@chakra-ui/react';

export function LoadingPage() {
  return (
    <Box
      position="absolute"
      zIndex={10}
      inset={0}
      background="white"
      _dark={{ background: 'black' }}
    >
      <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
        <Text fontSize={24} fontWeight="900" mb={1} color="green.300">
          Loading
        </Text>
        <Progress isIndeterminate colorScheme="green" w="400px" h="30px" />
      </Box>
    </Box>
  );
}
