import { Location } from "history";
import { useLocation } from "react-router-dom";
import { TCRouterHistory } from "./routeInterfaces";

const useTCLocation = (): Location<TCRouterHistory> =>
  useLocation<TCRouterHistory>();

export default useTCLocation;
