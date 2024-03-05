import { Navigate, Outlet } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';
const { LoginPage } = lazyImport(() => import('@/features/auth'), 'LoginPage');

const App = () => {
  return <Outlet />;
};

const beforeLoginRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <div>회원가입</div> },
      { path: '*', element: <Navigate to="/login" replace /> },
    ],
  },
];
export default beforeLoginRoutes;
