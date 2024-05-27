import { Navigate, RouteObject } from 'react-router-dom';

import { AuthRoutes } from '@/pages/auth';
import { lazyImport } from '@/shared/lib/lazy-import';
import { pathKeys } from '@/shared/lib/react-router';

const { NotLoginInvitationPage } = lazyImport(
  () => import('@/pages/invitation'),
  'NotLoginInvitationPage'
);

const beforeLoginRoutes: Array<RouteObject> = [
  AuthRoutes,
  {
    path: pathKeys.invitation.link(':link'),
    element: <NotLoginInvitationPage />,
  },
  { path: '*', element: <Navigate to={pathKeys.auth.login()} replace /> },
];
export default beforeLoginRoutes;
