import { SearchIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Input } from '@chakra-ui/react';
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

export function GroupDetailPage() {
  return (
    <Flex w="400px" h="100%">
      <Flex
        paddingY={2}
        flex={1}
        flexDirection="column"
        alignItems="center"
        gap={4}
        borderRight="1px"
        borderColor="gray.200"
      ></Flex>
    </Flex>
  );
}
