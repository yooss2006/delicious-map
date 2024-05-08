import { SearchIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Input, InputProps, chakra } from '@chakra-ui/react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useParsedLocation } from '@/shared/hooks';

type Props = {
  keyword?: string;
} & InputProps;

export function QueryStringSearch({ keyword = 'q', placeholder = '검색', ...props }: Props) {
  const { query } = useParsedLocation();
  const q = query[keyword];
  const [searchText, setSearchText] = useState(q ?? '');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleFormFinish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchText.replace(/^\s+|\s+$/g, '')) return;
    searchParams.set(keyword, searchText);
    setSearchParams(searchParams);
  };

  return (
    <chakra.form onSubmit={handleFormFinish}>
      <Flex justifyContent="space-between" alignItems="center" gap={2}>
        <Input
          {...props}
          placeholder={placeholder}
          borderWidth="1px"
          borderColor="gray.300"
          value={searchText}
          onChange={handleChange}
          size="lg"
        />
        <IconButton
          aria-label="검색"
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
