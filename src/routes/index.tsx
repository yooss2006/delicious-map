import { useEffect } from 'react';
import { useNavigate, useRoutes, useLocation } from 'react-router-dom';

import afterLoginRoutes from '@/routes/afterLogin';
import beforeLoginRoutes from '@/routes/beforeLogin';

const commonRoutes = [{ path: '/', element: <div>로딩중...</div> }];

export default function AppRouters() {
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const auth = false;

  useEffect(() => {
    if (pathname === '/' && !auth) navigation('/login');
  }, [auth, navigation, pathname]);

  const routes = auth ? afterLoginRoutes : beforeLoginRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
}
