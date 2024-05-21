import { Heading, chakra, Text } from '@chakra-ui/react';

import { useBookmark } from '@/entities/bookmark/ui/bookmark-provider';

export function BookmarkHeader() {
  const { data } = useBookmark();
  return (
    <chakra.header mb={5}>
      <Heading as="h2" fontSize="lg" textAlign="center">
        {data.merchantName}
      </Heading>
      <Text fontSize="small" color="gray.500" textAlign="center">
        {data.address}
      </Text>
    </chakra.header>
  );
}
