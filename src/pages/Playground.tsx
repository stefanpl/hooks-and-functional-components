import { Box, Button } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";

const { log } = console;

function sideEffect(name: string): void {
  log("I am a side effect!!", name);
}

const LightBulb: FunctionComponent = () => {
  const [isTurnedOn, setTurnedOn] = useState<boolean>(true);

  sideEffect("function body");

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
          setTurnedOn((old) => {
            sideEffect("state setter");
            return !old;
          });
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
