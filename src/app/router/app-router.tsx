import { useRoutes, RouteObject } from 'react-router-dom';

import afterLoginRouter from './after-login-router';
import beforeLoginRouter from './before-login-router';

const commonRoutes: Array<RouteObject> = [];

export function AppRouter() {
  const auth = false;

  const routes = auth ? afterLoginRouter : beforeLoginRouter;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
}
