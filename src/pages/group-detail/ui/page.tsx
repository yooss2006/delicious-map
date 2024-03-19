import { Box, Flex } from '@chakra-ui/react';

import { KakaoMapProvider } from '@/entities/kakao-map';
import { Map } from '@/entities/kakao-map/ui/map';
import { useParsedLocation } from '@/shared/hooks';
import { MainBox, SearchBox } from '@/widgets/group-detail/ui';

export function GroupDetailPage() {
  const { query } = useParsedLocation();

  const mode = query.mode || '';

  return (
    <KakaoMapProvider>
      <Flex w="100%">
        <Flex w="400px" h="100%">
          <Flex
            w="100%"
            flexDirection="column"
            alignItems="center"
            gap={4}
            background="white"
            color="black"
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
        <Box flex={1}>
          <Map />
        </Box>
      </Flex>
    </KakaoMapProvider>
  );
}
