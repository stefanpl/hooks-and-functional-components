import { TCAppRoutes, TCRoute } from "./routeInterfaces";

type RouteMap = {
  [route in TCAppRoutes]: TCRoute;
};

/**
 * The acutal data for the routes present in our app.
 */
const routes: RouteMap = {
  [TCAppRoutes.Welcome]: {
    path: "/",
    name: "Welcome",
  },
  [TCAppRoutes.FunctionIntro]: {
    path: "/functionIntro",
    name: "Function Components",
  },
};

export default routes;
