import { Flex } from '@chakra-ui/react';

import { useParsedLocation } from '@/shared/hooks';
import { MainBox, SearchBox } from '@/widgets/group-detail/ui';

export function GroupDetailPage() {
  const { query } = useParsedLocation();
  const mode = query.mode || '';

  return (
    <Flex w="400px" h="100%">
      <Flex
        flex={1}
        flexDirection="column"
        alignItems="center"
        gap={4}
        borderRight="1px"
        borderColor="gray.200"
      >
        {(() => {
          switch (mode) {
            case 'search':
              return <SearchBox />;
            case '':
            default:
              return <MainBox />;
          }
        })()}
      </Flex>
    </Flex>
  );
}
