import { Flex } from '@chakra-ui/react';

import SearchResult from '@/old-file/components/SearchResult';
import usePlaces from '@/old-file/hooks/usePlaces';

export default function PlaceSearch() {
  const { places } = usePlaces();

  return (
    <Flex as="section" flexDirection="column" px={2} py={4} w="400px" h="100%">
      <h2 className="blind">가게 이름 및 주소 검색</h2>
      <SearchResult places={places} />
    </Flex>
  );
}
