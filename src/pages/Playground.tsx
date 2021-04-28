import { Box, Button } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";

let numberOfCalls = 0;

const LightBulb: FunctionComponent = () => {
  const [isTurnedOn, setTurnedOn] = useState<boolean>(true);

  numberOfCalls += 1;

  console.log(`hi i am the lightbulb, been called ${numberOfCalls} times.`);

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
          setTurnedOn((oldValue) => !oldValue);
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
