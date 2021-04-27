import React, { ReactElement } from "react";
import { TCAppRoutes } from "./routeInterfaces";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const AnotherPage = React.lazy(() => import("../pages/AnotherPage"));
const LeThirdPage = React.lazy(() => import("../pages/AnotherPage"));

/**
 * Each route renders a given component.
 * Assign identical keys to avoid re-mounting of pages.
 */
const componentsForRoutes: Record<TCAppRoutes, ReactElement> = {
  [TCAppRoutes.Welcome]: <HomePage />,
  [TCAppRoutes.Another]: <AnotherPage />,
  [TCAppRoutes.LeThird]: <LeThirdPage />,
};

export default componentsForRoutes;
