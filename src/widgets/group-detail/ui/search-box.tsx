import { SearchIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Input, chakra } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function SearchBox() {
  return (
    <>
      <SearchForm />
    </>
  );
}

export default function SearchForm() {
  const [searchText, setSearchText] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleFormFinish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchText.replace(/^\s+|\s+$/g, '')) return;
    searchParams.set('q', searchText);
    setSearchParams(searchParams);
  };

  useEffect(() => setSearchText(''), []);
  return (
    <chakra.form w="100%" px={4} onSubmit={handleFormFinish}>
      <Flex justifyContent="space-between" alignItems="center" gap={2}>
        <Input value={searchText} onChange={handleChange} placeholder="장소 검색" size="lg" />
        <IconButton
          aria-label="Search Place"
          type="submit"
          icon={<SearchIcon />}
          size="lg"
          colorScheme="blue"
        />
      </Flex>
    </chakra.form>
  );
}
