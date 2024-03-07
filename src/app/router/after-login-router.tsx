import { Navigate, Outlet } from 'react-router-dom';

import { lazyImport } from '@/old-file/utils/lazyImport';
const { MapPage } = lazyImport(() => import('@/old-file/features/map'), 'MapPage');

const App = () => {
  return <Outlet />;
};

const afterLoginRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/map', element: <MapPage /> },
      { path: '/', element: <div>시작</div> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];

export default afterLoginRoutes;