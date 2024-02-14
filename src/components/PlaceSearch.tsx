import { Box } from '@chakra-ui/react';

import SearchForm from './SearchForm';

export default function PlaceSearch() {
  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <Box as="section">
      <h2 className="blind">가게 이름 및 주소 검색</h2>
      <SearchForm onSearch={onSearch} placeholder="가게 이름 및 주소 검색" />
    </Box>
  );
}
