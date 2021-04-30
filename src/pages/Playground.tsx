import { Box, Button } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";

let counter = 0;

const LightBulb: FunctionComponent = () => {
  const [isTurnedOn, setTurnedOn] = useState<boolean>(true);

  counter += 1;

  console.log(`counter is now ${counter}`);

  return (
    <>
      <Box
        style={{
          backgroundColor: isTurnedOn ? "yellow" : "black",
          width: 100,
          height: 100,
          borderRadius: "50%",
        }}
      />
      <Button
        onClick={() => {
          setTurnedOn((old) => !old);
        }}
      >
        toggle light
      </Button>
    </>
  );
};

const Playground: React.FunctionComponent = () => {
  console.log(`this is the playground`);

  return (
    <>
      <LightBulb />
    </>
  );
};

export default Playground;
