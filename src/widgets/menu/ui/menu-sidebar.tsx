import { Flex, Link as ChakraLink, Text } from '@chakra-ui/react';
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

export function MenuSidebar() {
  const { pathname, query } = useParsedLocation();

  const mode = query.mode ?? '';

  return (
    <Flex
      p={2}
      flexDirection="column"
      gap={4}
      alignContent="center"
      background="gray.100"
      borderRight="1px"
      borderColor="gray.300"
    >
      {MENU_LIST.map(({ label, Icon, query }) => {
        const isSelect = mode === query;
        const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          if (isSelect) {
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
            onClick={handleLinkClick}
            color={isSelect ? 'white' : 'black'}
            borderRadius="md"
            boxSizing="content-box"
            background={isSelect ? 'gray.600' : 'none'}
          >
            <Icon size="20px" />
            <Text textAlign="center">{label}</Text>
          </ChakraLink>
        );
      })}
    </Flex>
  );
}
