import { Navigate, RouteObject } from 'react-router-dom';

import { CreateProfilePage, LoginPage, RegisterPage } from '@/pages/auth';
import { AuthLayout } from '@/pages/layout';
import { lazyImport } from '@/shared/lib/lazy-import';

const { NotLoginInvitationPage } = lazyImport(
  () => import('@/pages/invitation'),
  'NotLoginInvitationPage'
);

const beforeLoginRoutes: Array<RouteObject> = [
  {
    path: '/auth/*',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'create-profile',
        element: <CreateProfilePage />,
      },
      { path: '*', element: <Navigate to="/auth/login" replace /> },
    ],
  },
  {
    path: '/invitation/:link',
    element: <NotLoginInvitationPage />,
  },
  { path: '*', element: <Navigate to="/auth/login" replace /> },
];
export default beforeLoginRoutes;
