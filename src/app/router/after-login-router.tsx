import { Navigate } from 'react-router-dom';

import { MapLayout } from '@/pages/group-detail/ui/map-layout';
import { lazyImport } from '@/shared/lib/lazyImport';

const { GroupDetailPage } = lazyImport(() => import('@/pages/group-detail'), 'GroupDetailPage');

const afterLoginRoutes = [
  {
    path: '/',
    element: <MapLayout />,
    children: [
      { path: '/', element: <div>시작</div> },
      { path: '/group/:id', element: <GroupDetailPage /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];

export default afterLoginRoutes;
