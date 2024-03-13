import { AddIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Button, Image } from '@chakra-ui/react';

export function GroupSidebar() {
  return (
    <Flex
      paddingY={2}
      flexBasis="60px"
      flexDirection="column"
      alignItems="center"
      gap={4}
      background="white"
    >
      <IconButton colorScheme="blue" aria-label="그룹 추가" icon={<AddIcon />} />
      <Flex flexDirection="column" gap={4} alignItems="center">
        <Button colorScheme="blue" w={10} h={10} p={0} borderRadius="md">
          <Image
            src="https://bit.ly/sage-adebayo"
            alt="Segun Adebayo"
            w="100%"
            h="100%"
            objectFit="cover"
            borderRadius="md"
          />
        </Button>
        <Button colorScheme="blue" w={10} h={10} p={0} borderRadius="md">
          <Image
            src="https://bit.ly/sage-adebayo"
            alt="Segun Adebayo"
            w="100%"
            h="100%"
            objectFit="cover"
            borderRadius="md"
          />
        </Button>
        <Button colorScheme="blue" w={10} h={10} p={0} borderRadius="md">
          <Image
            src="https://bit.ly/sage-adebayo"
            alt="Segun Adebayo"
            w="100%"
            h="100%"
            objectFit="cover"
            borderRadius="md"
          />
        </Button>
        <Button colorScheme="blue" w={10} h={10} p={0} borderRadius="md">
          <Image
            src="https://bit.ly/sage-adebayo"
            alt="Segun Adebayo"
            w="100%"
            h="100%"
            objectFit="cover"
            borderRadius="md"
          />
        </Button>
      </Flex>
    </Flex>
  );
}
