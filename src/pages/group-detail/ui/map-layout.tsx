import { Flex } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { DynamicModal } from '@/shared/lib/modal';
import { GroupSidebar } from '@/widgets/group';
import { MenuSidebar } from '@/widgets/menu';

export function MapLayout() {
  return (
    <Flex h="100%">
      <GroupSidebar />
      <MenuSidebar />
      <Suspense fallback="로딩중">
        <Outlet />
      </Suspense>
      <DynamicModal />
    </Flex>
  );
}
