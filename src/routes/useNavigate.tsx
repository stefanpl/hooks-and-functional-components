import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { TCAppRoutes } from "./routeInterfaces";
import { path, reactRouterStateFromLocation } from "./routingHelper";
import useTCLocation from "./useTCLocation";

const useNavigate = (): ((route: TCAppRoutes) => void) => {
  const history = useHistory();
  const location = useTCLocation();
  return useCallback(
    (route: TCAppRoutes, id?: number) =>
      history.push(path(route, id), reactRouterStateFromLocation(location)),
    [history, location]
  );
};

export default useNavigate;
