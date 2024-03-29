import { useRoutes, RouteObject } from 'react-router-dom';

import { useCurrentUser } from '@/features/auth/user/get-current-user';

import afterLoginRouter from './after-login-router';
import beforeLoginRouter from './before-login-router';

const commonRoutes: Array<RouteObject> = [];

export function AppRouter() {
  const { data: user, isLoading } = useCurrentUser();

  const routes = user ? afterLoginRouter : beforeLoginRouter;

  const element = useRoutes([...routes, ...commonRoutes]);

  if (isLoading) return <div>로딩중</div>;

  return <>{element}</>;
}
