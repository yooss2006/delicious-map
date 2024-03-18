import { Navigate } from 'react-router-dom';

import { lazyImport } from '@/shared/lib/lazyImport';

import { MapLayout } from '../layout/map-layout';

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
