import { Typography } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";
import componentsForRoutes from "./componentsForRoutes";
import { TCAppRoutes, TCRoute } from "./routeInterfaces";
import routes from "./routes";
import { genericPath } from "./routingHelper";

const dynamicRoutes = Object.keys(routes).map((routeKey) => {
  const route: TCRoute = routes[routeKey as TCAppRoutes];
  const pageComponent = componentsForRoutes[routeKey as TCAppRoutes];
  return (
    <Route exact key={pageComponent.key || routeKey} path={genericPath(route)}>
      <React.Suspense fallback={<Typography>Is loading</Typography>}>
        {pageComponent}
      </React.Suspense>
    </Route>
  );
});

/**
 * A mapping of our routes to components for the react-router.
 */
const TCRoutes = (): ReactElement => (
  <Switch>
    {dynamicRoutes}
    <Route path="*">
      <Typography variant="h1">404</Typography>
    </Route>
  </Switch>
);

export default TCRoutes;
