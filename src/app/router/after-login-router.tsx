import { Navigate, RouteObject } from 'react-router-dom';

import { GroupRoutes } from '@/pages/group/route';
import { AuthLayout } from '@/pages/layout';
import { MapLayout } from '@/pages/layout/ui/map-layout';
import { lazyImport } from '@/shared/lib/lazy-import';

const { ReplacePage } = lazyImport(() => import('@/widgets/replace-page'), 'ReplacePage');
const { CreateMerchantPage } = lazyImport(
  () => import('@/pages/craete-bookmark'),
  'CreateMerchantPage'
);
const { InvitationPage } = lazyImport(() => import('@/pages/invitation'), 'InvitationPage');
const { EditProfilePage } = lazyImport(() => import('@/pages/edit-profile'), 'EditProfilePage');

const afterLoginRoutes: Array<RouteObject> = [
  {
    path: '/invitation/:link',
    element: <InvitationPage />,
  },
  {
    path: '/edit-profile',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <EditProfilePage />,
      },
    ],
  },
  {
    path: '/',
    element: <MapLayout />,
    children: [
      { path: '/', element: <ReplacePage /> },
      GroupRoutes,
      { path: '/group/:id/create-bookmark', element: <CreateMerchantPage /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];

export default afterLoginRoutes;
