import { Location } from "history";
import { TCAppRoutes, TCRoute, TCRouterHistory } from "./routeInterfaces";
import routes from "./routes";

export const pathWithId = (route: TCAppRoutes, id: number): string =>
  `${routes[route].path}/${id}`;

export const path = (route: TCAppRoutes, id?: number): string => {
  const theRoute = routes[route];
  if (theRoute.needsAnId && !id) {
    throw new Error(`Cannot go to ${theRoute.path} without an id.`);
  }
  if (!theRoute.needsAnId && id) {
    throw new Error(`No id required for going to ${theRoute.path}.`);
  }
  return theRoute.needsAnId
    ? `${theRoute.path}/${id as number}`
    : theRoute.path;
};

export const genericPath = (route: TCRoute): string =>
  route.needsAnId ? `${route.path}/:id` : route.path;

export const reactRouterStateFromLocation = (
  location: Location<TCRouterHistory>
): TCRouterHistory => ({
  formerPath: location.pathname,
});
