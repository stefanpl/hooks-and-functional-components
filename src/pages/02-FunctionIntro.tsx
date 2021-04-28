import { Button } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";

interface SomethingWithAName {
  name: string;
}

const MyComponent: FunctionComponent<SomethingWithAName> = (props) => (
  <h1>hello {props.name}</h1>
);

const FunctionIntro: React.FunctionComponent = () => {
  const [showComponent, setShowComponent] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setShowComponent((old) => !old)}
      >
        toggle
      </Button>
      {showComponent && <MyComponent name="huhu" />}
    </>
  );
};

export default FunctionIntro;
