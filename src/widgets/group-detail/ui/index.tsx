import { Flex } from '@chakra-ui/react';

import { useParsedLocation } from '@/shared/hooks';

import { MainBox } from './main-box';
import { MenuSidebar } from './menu-sidebar';
import { SearchBox } from './search-box';

export function GroupDetailPageContent() {
  const { query } = useParsedLocation();

  const mode = query.mode || '';
  return (
    <Flex w="440px" h="100%">
      <MenuSidebar />
      <Flex
        flex={1}
        h="100%"
        flexDirection="column"
        alignItems="center"
        gap={4}
        background="gray.50"
        color="black"
        borderRight="1px"
        borderColor="gray.200"
        _dark={{ background: 'gray.500' }}
      >
        {(() => {
          switch (mode) {
            case 'search':
              return <SearchBox />;
            default:
              return <MainBox />;
          }
        })()}
      </Flex>
    </Flex>
  );
}
