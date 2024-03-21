import { Flex, Link as ChakraLink, Box } from '@chakra-ui/react';
import { IoHome, IoSearch } from 'react-icons/io5';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useParsedLocation } from '@/shared/hooks';

const MENU_LIST = [
  {
    label: '홈',
    Icon: IoHome,
    query: '',
  },
  {
    label: '검색',
    Icon: IoSearch,
    query: 'search',
  },
];

export function MenuList() {
  const { pathname, query } = useParsedLocation();

  const mode = query.mode ?? '';

  return (
    <Flex
      p={2}
      background="white"
      borderRight="1px"
      borderColor="gray.200"
      flexDirection="column"
      gap={4}
      alignContent="center"
    >
      {MENU_LIST.map(({ label, Icon, query }) => {
        const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          if (mode === query) {
            e.preventDefault();
          }
        };
        return (
          <ChakraLink
            as={ReactRouterLink}
            to={`${pathname}${query ? `?mode=${query}` : ''}`}
            key={label}
            w={14}
            h={14}
            p={0}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            color="black"
            onClick={handleLinkClick}
            borderRadius="md"
            boxSizing="content-box"
            background={mode === query ? 'gray.200' : 'none'}
          >
            <Icon size="20px" />
            <Box textAlign="center">{label}</Box>
          </ChakraLink>
        );
      })}
    </Flex>
  );
}
