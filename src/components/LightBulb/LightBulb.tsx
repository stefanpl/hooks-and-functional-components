import { Box, Button } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { useLightBulbViewModel } from "./useLightBulbViewModel";

const LightBulb: FunctionComponent = () => {
  const { style, toggleLightBulb } = useLightBulbViewModel();

  return (
    <>
      <Box style={style} />
      <Button onClick={toggleLightBulb}>toggle light</Button>
    </>
  );
};

export default LightBulb;
