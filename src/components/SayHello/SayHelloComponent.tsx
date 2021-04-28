import React, { FunctionComponent, ReactElement } from "react";
import { SomebodyToSayHiTo } from "./SayHelloInterfaces";

/**
 * The most simple case. TS will scream.
 */
const SayHello: FunctionComponent<SomebodyToSayHiTo> = (
  props
): ReactElement => <h1>hello {props.name}</h1>;

export default SayHello;
