import { Flex } from '@chakra-ui/react';

import { useParsedLocation } from '@/shared/hooks';

import { SearchForm } from './search-form';
import { SearchResultList } from './search-result';

export function SearchBox() {
  const { query } = useParsedLocation();
  const q = query.q;
  return (
    <Flex w="100%" h="100%" mt={2} px={4} flexDirection="column">
      <SearchForm />
      {q && <SearchResultList />}
    </Flex>
  );
}
