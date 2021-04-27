import { TCAppRoutes, TCRoute } from "./routeInterfaces";

type RouteMap = {
  [route in TCAppRoutes]: TCRoute;
};

const specialRoutes: Partial<RouteMap> = {
  [TCAppRoutes.Welcome]: {
    path: "/",
  },
};

/**
 * The acutal data for the routes present in our app.
 */
const routes: RouteMap = Object.entries(TCAppRoutes).reduce(
  (routeMap, [, routeVal]) => ({
    ...routeMap,
    [routeVal]: specialRoutes[routeVal] || {
      path: `/${routeVal.toLowerCase()}`,
    },
  }),
  {}
) as RouteMap;

export default routes;
