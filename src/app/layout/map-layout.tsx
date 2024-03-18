import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { KakaoMapProvider } from '@/app/providers/kakao-map-provider';
import { DynamicModal } from '@/shared/lib/modal';
import { GroupSidebar } from '@/widgets/group';
import { MenuSidebar } from '@/widgets/menu';

export function MapLayout() {
  return (
    <KakaoMapProvider>
      <Flex h="100%">
        <GroupSidebar />
        <MenuSidebar />
        <Outlet />
        <DynamicModal />
      </Flex>
    </KakaoMapProvider>
  );
}
