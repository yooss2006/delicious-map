import { useQuery } from '@tanstack/react-query';
import { useRoutes, RouteObject } from 'react-router-dom';

import { getUser } from '@/features/auth/user';

import afterLoginRouter from './after-login-router';
import beforeLoginRouter from './before-login-router';

const commonRoutes: Array<RouteObject> = [];

export function AppRouter() {
  const { data, isLoading } = useQuery({
    queryKey: ['current_user'],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const routes = data ? afterLoginRouter : beforeLoginRouter;

  const element = useRoutes([...routes, ...commonRoutes]);

  if (isLoading) return <div>로딩중</div>;

  return <>{element}</>;
}
