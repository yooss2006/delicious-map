import { RouteObject } from 'react-router-dom';

import { lazyImport } from '@/shared/lib/lazy-import';

const { GroupDetailPage } = lazyImport(() => import('./ui/group-detail-page'), 'GroupDetailPage');
const { CreateGroupPage } = lazyImport(() => import('./ui/create-group-page'), 'CreateGroupPage');
const { EditGroupPage } = lazyImport(() => import('./ui/edit-group-page'), 'EditGroupPage');

export const GroupRoutes: RouteObject = {
  path: 'group',
  children: [
    {
      path: 'create',
      element: <CreateGroupPage />,
    },
    {
      path: ':id/edit',
      element: <EditGroupPage />,
    },
    {
      path: ':id',
      element: <GroupDetailPage />,
    },
  ],
};
