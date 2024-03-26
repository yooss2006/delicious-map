import { Navigate } from 'react-router-dom';

import { MapLayout } from '@/pages/layout/ui/map-layout';
import { lazyImport } from '@/shared/lib/lazyImport';

const { DetailPage } = lazyImport(() => import('@/pages/group-detail'), 'DetailPage');
const { ReplacePage } = lazyImport(() => import('@/widgets/replace-page'), 'ReplacePage');
const { CreateGroupPage } = lazyImport(() => import('@/pages/create-group'), 'CreateGroupPage');
const { EditGroupPage } = lazyImport(() => import('@/pages/edit-group'), 'EditGroupPage');

const afterLoginRoutes = [
  {
    path: '/',
    element: <MapLayout />,
    children: [
      { path: '/', element: <ReplacePage /> },
      { path: '/create-group', element: <CreateGroupPage /> },
      { path: '/group/:id', element: <DetailPage /> },
      { path: '/edit-group/:id', element: <EditGroupPage /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];

export default afterLoginRoutes;
