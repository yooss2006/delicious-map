import { Navigate } from 'react-router-dom';

import { AuthLayout } from '@/pages/layout';
import { MapLayout } from '@/pages/layout/ui/map-layout';
import { lazyImport } from '@/shared/lib/lazy-import';

const { DetailPage } = lazyImport(() => import('@/pages/group-detail'), 'DetailPage');
const { ReplacePage } = lazyImport(() => import('@/widgets/replace-page'), 'ReplacePage');
const { CreateGroupPage } = lazyImport(() => import('@/pages/create-group'), 'CreateGroupPage');
const { EditGroupPage } = lazyImport(() => import('@/pages/edit-group'), 'EditGroupPage');
const { CreateMerchantPage } = lazyImport(
  () => import('@/pages/craete-bookmark'),
  'CreateMerchantPage'
);
const { InvitationPage } = lazyImport(() => import('@/pages/invitation'), 'InvitationPage');
const { EditProfilePage } = lazyImport(() => import('@/pages/edit-profile'), 'EditProfilePage');

const afterLoginRoutes = [
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
      { path: '/create-group', element: <CreateGroupPage /> },
      { path: '/group/:id', element: <DetailPage /> },
      { path: '/group/:id/create-bookmark', element: <CreateMerchantPage /> },
      { path: '/edit-group/:id', element: <EditGroupPage /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];

export default afterLoginRoutes;
