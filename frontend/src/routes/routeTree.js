import { createRootRoute } from '@tanstack/react-router';
import App from '../App.jsx';
import { authRoute } from './auth.route.js';
import { dashboardRoute } from './dashboard.route.js';
import { homePageRoute } from './homePage.route.js';

export const rootRoute = createRootRoute({
  component: App,
});

export const routeTree = rootRoute.addChildren([
  homePageRoute,
  authRoute,
  dashboardRoute,
]);
