import { Flex } from '@chakra-ui/react';

import Map from '@/components/Map';
import PlaceSearch from '@/components/PlaceSearch';
import { KakaoMapProvider } from '@/lib/kakao-map';

export function MapPage() {
  return (
    <KakaoMapProvider>
      <Flex h="100%">
        <PlaceSearch />
        <Map />
      </Flex>
    </KakaoMapProvider>
  );
}
