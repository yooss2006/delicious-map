import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from '@/routes/protected';

const commonRoutes = [{ path: '/', element: <div>로딩중...</div> }];

export default function AppRouters() {
  const auth = true;

  const routes = auth ? protectedRoutes : [];

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
}
