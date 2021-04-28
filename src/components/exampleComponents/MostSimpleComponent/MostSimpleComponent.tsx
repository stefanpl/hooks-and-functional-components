import React from "react";
import { ReactFunctionComponent } from "../../interfaces";

/**
 * The most simple form of component:
 *  - does not take any props
 *  - returns a static JSX Element
 */
const MostSimpleComponent: ReactFunctionComponent = () => <div>Hello</div>;

export default MostSimpleComponent;
