import { useRoutes, RouteObject } from 'react-router-dom';

import { useProfile } from '@/entities/profile';
import { LoadingPage } from '@/shared/ui/layout';

import afterLoginRouter from './after-login-router';
import beforeLoginRouter from './before-login-router';

const commonRoutes: Array<RouteObject> = [];

export function AppRouter() {
  const { data: user, isLoading } = useProfile();

  const routes = user ? afterLoginRouter : beforeLoginRouter;

  const element = useRoutes([...routes, ...commonRoutes]);

  if (isLoading) return <LoadingPage />;

  return <>{element}</>;
}
