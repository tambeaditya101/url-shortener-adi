import { createRoute } from '@tanstack/react-router';
import Dashboard from '../pages/Dashboard';
import { isAuthorized } from '../utils/helper';
import { rootRoute } from './routeTree';

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
  beforeLoad: isAuthorized,
});
