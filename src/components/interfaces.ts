import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export interface ExtendedFunctionComponent<P = {}>
  extends React.FunctionComponent<P> {
  stringRepresentation: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type ReactFunctionComponent<P = {}> = React.FunctionComponent<P>;
