import { Navigate, Outlet } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';
const { MapRoutes } = lazyImport(() => import('@/features/map'), 'MapRoutes');

const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/map', element: <MapRoutes /> },
      { path: '/', element: <div>시작</div> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
