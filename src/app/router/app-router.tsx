import { useQuery } from '@tanstack/react-query';
import { useRoutes } from 'react-router-dom';

import { profileQueries } from '@/entities/profile';
import { LoadingPage } from '@/shared/ui/layout';

import afterLoginRouter from './after-login-router';
import beforeLoginRouter from './before-login-router';

export function AppRouter() {
  const { data: user, isLoading } = useQuery(profileQueries.profileService.queryOptions());

  const routes = user ? afterLoginRouter : beforeLoginRouter;

  const element = useRoutes(routes);

  if (isLoading) return <LoadingPage />;

  return <>{element}</>;
}
