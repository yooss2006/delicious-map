import { Box, Flex } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { KakaoMapProvider } from '@/entities/kakao-map';
import { Map } from '@/entities/kakao-map/ui/map';

import { DesktopSidebar } from './desktop-sidebar';

export function MapLayout() {
  return (
    <KakaoMapProvider>
      <Flex w="100%" h="100%">
        <DesktopSidebar />
        <Suspense
          fallback={
            <Flex background="white" w="400px" h="100%">
              로딩중
            </Flex>
          }
        >
          <Outlet />
        </Suspense>
        <Box flex={1}>
          <Map />
        </Box>
      </Flex>
    </KakaoMapProvider>
  );
}
