import { Navigate, RouteObject } from 'react-router-dom';

import { lazyImport } from '@/old-file/utils/lazyImport';
import AuthLayout from '@/shared/ui/layout/auth-layout';

const { LoginPage } = lazyImport(() => import('@/pages/auth'), 'LoginPage');
const { RegisterPage } = lazyImport(() => import('@/pages/auth'), 'RegisterPage');

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
      { path: '*', element: <Navigate to="/auth/login" replace /> },
    ],
  },
  { path: '*', element: <Navigate to="/auth/login" replace /> },
];
export default beforeLoginRoutes;
