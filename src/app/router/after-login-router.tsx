import { Navigate } from 'react-router-dom';

import { MapLayout } from '../layout/map-layout';

const afterLoginRoutes = [
  {
    path: '/',
    element: <MapLayout />,
    children: [
      { path: '/', element: <div>시작</div> },
      { path: '/group/:id', element: <div>시작</div> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];

export default afterLoginRoutes;
