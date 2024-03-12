import { Navigate, Outlet } from 'react-router-dom';

const App = () => {
  return <Outlet />;
};

const afterLoginRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <div>시작</div> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];

export default afterLoginRoutes;
