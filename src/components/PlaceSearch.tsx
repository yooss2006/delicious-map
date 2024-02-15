import { Flex } from '@chakra-ui/react';

import SearchResult from '@/components/SearchResult';
import usePlaces from '@/hooks/usePlaces';

import SearchForm from './SearchForm';

export default function PlaceSearch() {
  const { places, handleSearchPlaces } = usePlaces();

  return (
    <Flex as="section" flexDirection="column" px={2} py={4} w="400px" h="100%">
      <h2 className="blind">가게 이름 및 주소 검색</h2>
      <SearchForm onSearch={handleSearchPlaces} placeholder="가게 이름 및 주소 검색" />
      <SearchResult places={places} />
    </Flex>
  );
}
