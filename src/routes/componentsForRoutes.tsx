import React, { ReactElement } from "react";
import { TCAppRoutes } from "./routeInterfaces";

const HomePage = React.lazy(() => import("../pages/01-WelcomePage"));
const FunctionIntroPage = React.lazy(() => import("../pages/02-FunctionIntro"));
const Playground = React.lazy(() => import("../pages/Playground"));

/**
 * Each route renders a given component.
 * Assign identical keys to avoid re-mounting of pages.
 */
const componentsForRoutes: Record<TCAppRoutes, ReactElement> = {
  [TCAppRoutes.Welcome]: <HomePage />,
  [TCAppRoutes.FunctionIntro]: <FunctionIntroPage />,
  [TCAppRoutes.Playground]: <Playground />,
};

export default componentsForRoutes;
