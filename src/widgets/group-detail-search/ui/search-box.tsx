import { Flex } from '@chakra-ui/react';

import { QueryStringSearch } from '@/shared/ui/search';

import { SearchResultList } from './search-result';

export function SearchBox() {
  return (
    <Flex w="100%" h="100%" mt={2} px={4} flexDirection="column">
      <QueryStringSearch />
      <SearchResultList />
    </Flex>
  );
}
