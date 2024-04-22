import { SearchIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Input, chakra } from '@chakra-ui/react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useParsedLocation } from '@/shared/hooks';

type Props = {
  key?: string;
};

export function QueryStringSearch({ key = 'q' }: Props) {
  const { query } = useParsedLocation();
  const q = query[key];
  const [searchText, setSearchText] = useState(q ?? '');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleFormFinish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchText.replace(/^\s+|\s+$/g, '')) return;
    searchParams.set(key, searchText);
    setSearchParams(searchParams);
  };

  return (
    <chakra.form onSubmit={handleFormFinish}>
      <Flex justifyContent="space-between" alignItems="center" gap={2}>
        <Input
          borderWidth="1px"
          borderColor="gray.300"
          value={searchText}
          onChange={handleChange}
          placeholder="장소 검색"
          size="lg"
        />
        <IconButton
          aria-label="음식점/카페 검색"
          type="submit"
          icon={<SearchIcon />}
          size="lg"
          background="green.50"
          _hover={{ background: 'green.200' }}
        />
      </Flex>
    </chakra.form>
  );
}
