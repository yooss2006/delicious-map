import { Flex } from '@chakra-ui/react';

import Map from '@/old-file/components/Map';
import PlaceSearch from '@/old-file/components/PlaceSearch';
import { KakaoMapProvider } from '@/old-file/lib/kakao-map';

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
