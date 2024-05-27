import { RouteObject, Navigate } from 'react-router-dom';

import { AuthLayout } from '@/pages/layout';
import { pathKeys } from '@/shared/lib/react-router';

import { CreateProfilePage } from './pages/create-profile';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';

export const AuthRoutes: RouteObject = {
  path: pathKeys.auth.root(),
  element: <AuthLayout />,
  children: [
    {
      path: pathKeys.auth.login(),
      element: <LoginPage />,
    },
    {
      path: pathKeys.auth.createProfile(),
      element: <CreateProfilePage />,
    },
    {
      path: pathKeys.auth.register(),
      element: <RegisterPage />,
    },
    { path: '*', element: <Navigate to={pathKeys.auth.login()} replace /> },
  ],
};
