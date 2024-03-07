import { IconButton } from '@chakra-ui/button';
import { SearchIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Flex } from '@chakra-ui/layout';
import React from 'react';

export default function SearchForm({
  onSearch,
  placeholder,
}: {
  onSearch: (value: string) => void;
  placeholder: string;
}) {
  const [searchText, setSearchText] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleFormFinish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchText.replace(/^\s+|\s+$/g, '')) return;
    onSearch(searchText);
  };

  React.useEffect(() => setSearchText(''), []);
  return (
    <form onSubmit={handleFormFinish}>
      <Flex justifyContent="space-between" alignItems="center" gap={2}>
        <Input value={searchText} onChange={handleChange} placeholder={placeholder} size="lg" />
        <IconButton
          aria-label="Search Place"
          type="submit"
          icon={<SearchIcon />}
          size="lg"
          colorScheme="blue"
        />
      </Flex>
    </form>
  );
}
