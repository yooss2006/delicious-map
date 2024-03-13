import { Navigate, RouteObject } from 'react-router-dom';

import { AuthLayout } from '@/app/layout/auth-layout';
import { lazyImport } from '@/shared/lib/lazyImport';

const { LoginPage } = lazyImport(() => import('@/pages/auth'), 'LoginPage');
const { RegisterPage } = lazyImport(() => import('@/pages/auth'), 'RegisterPage');
const { EmailVerificationPage } = lazyImport(() => import('@/pages/auth'), 'EmailVerificationPage');

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
        path: 'email-verification',
        element: <EmailVerificationPage />,
      },
      { path: '*', element: <Navigate to="/auth/login" replace /> },
    ],
  },
  { path: '*', element: <Navigate to="/auth/login" replace /> },
];
export default beforeLoginRoutes;
