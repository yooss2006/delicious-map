import { Navigate, RouteObject } from 'react-router-dom';

import { EmailVerificationPage, LoginPage, RegisterPage } from '@/pages/auth';
import { AuthLayout } from '@/pages/layout';

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
