import React from "react";
import { ReactFunctionComponent } from "../../interfaces";

interface PropsWithName {
  name: string;
}

/**
 * Now with props:
 *  - it's a regular function, taking an object as input
 *  - the generic ReactFunctionComponent needs to know what kind of props we're expecting
 *  - returns a JSX Element based on the name
 */
const ComponentWithProps: ReactFunctionComponent<PropsWithName> = (props) => (
  <div>Hello {props.name}</div>
);

export default ComponentWithProps;
