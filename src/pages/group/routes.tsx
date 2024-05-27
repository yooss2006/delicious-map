import { RouteObject } from 'react-router-dom';

import { lazyImport } from '@/shared/lib/lazy-import';
import { pathKeys } from '@/shared/lib/react-router';

const { GroupDetailPage } = lazyImport(() => import('./pages/group-detail'), 'GroupDetailPage');
const { CreateGroupPage } = lazyImport(() => import('./pages/create-group'), 'CreateGroupPage');
const { SettingGroupPage } = lazyImport(() => import('./pages/setting-group'), 'SettingGroupPage');

export const GroupRoutes: RouteObject = {
  path: pathKeys.group.root(),
  children: [
    {
      path: pathKeys.group.create(),
      element: <CreateGroupPage />,
    },
    {
      path: pathKeys.group.setting(':id'),
      element: <SettingGroupPage />,
    },
    {
      path: pathKeys.group.detail(':id'),
      element: <GroupDetailPage />,
    },
  ],
};
