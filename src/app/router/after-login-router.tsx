import { Navigate, RouteObject } from 'react-router-dom';

import { BookmarkRoutes } from '@/pages/bookmark/route';
import { GroupRoutes } from '@/pages/group/routes';
import { AuthLayout, MapLayout } from '@/pages/layout';
import { lazyImport } from '@/shared/lib/lazy-import';
import { pathKeys } from '@/shared/lib/react-router';

const { ReplacePage } = lazyImport(() => import('@/pages/replace'), 'ReplacePage');
const { InvitationPage } = lazyImport(() => import('@/pages/invitation'), 'InvitationPage');
const { EditProfilePage } = lazyImport(() => import('@/pages/auth'), 'EditProfilePage');

const afterLoginRoutes: Array<RouteObject> = [
  {
    path: pathKeys.invitation.link(':link'),
    element: <InvitationPage />,
  },
  {
    path: pathKeys.auth.editProfile(),
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <EditProfilePage />,
      },
    ],
  },
  {
    path: pathKeys.root,
    element: <MapLayout />,
    children: [
      { path: pathKeys.root, element: <ReplacePage /> },
      GroupRoutes,
      BookmarkRoutes,
      { path: '*', element: <Navigate to={pathKeys.root} /> },
    ],
  },
];

export default afterLoginRoutes;
