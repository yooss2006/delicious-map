import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { KakaoMapProvider } from '@/app/providers/kakao-map-provider';
import { GroupSidebar } from '@/widgets/group';

export function MapLayout() {
  return (
    <KakaoMapProvider>
      <Flex h="100%">
        <GroupSidebar />
        <Outlet />
      </Flex>
    </KakaoMapProvider>
  );
}
