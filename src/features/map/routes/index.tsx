import { Box, Flex } from '@chakra-ui/react';

import KakaoMap from '@/components/KakaoMap';
import PlaceSearch from '@/components/PlaceSearch';
import { KakaoMapProvider } from '@/lib/kakao-map';

export function MapPage() {
  return (
    <KakaoMapProvider>
      <Flex h="100%">
        <Box px={2} py={4} w="400px" h="100%">
          <PlaceSearch />
        </Box>
        <KakaoMap />
      </Flex>
    </KakaoMapProvider>
  );
}
