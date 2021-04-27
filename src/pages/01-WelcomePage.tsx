import { Box, Typography } from "@material-ui/core";
import React, { ReactElement } from "react";

const animated = (icon: string): ReactElement => (
  <i
    style={{ display: "inline-block" }}
    className="animate__animated animate__slideInDown"
  >
    {icon}
  </i>
);

const WelcomePage: React.FunctionComponent = () => {
  // eslint-disable-next-line no-console
  console.log(nameof(WelcomePage));
  return (
    <>
      <Typography variant="h1">
        React hooks {animated("🎣")} and function components {animated("🦈")}
      </Typography>
      <Typography variant="subtitle1">
        Another peculiar assortment of knowledge
      </Typography>

      <Box>
        <Typography variant="h2">Agenda</Typography>
        <Typography variant="body1">
          <ul>
            <li>what is a function component, and why should we use them</li>
            <li>
              the lifecycle of a component:
              <ul>
                <li>mounting & unmounting</li>
                <li>rendering & re-rendering</li>
              </ul>
            </li>
            <li>what is a hook, and why do we use them</li>
            <li>
              a closer look at some basic hooks:
              <ul>
                <li>useState</li>
                <li>useRef</li>
                <li>useCallback</li>
                <li>useMemo</li>
                <li>useEffect</li>
              </ul>
            </li>
            <li>
              some basic debugging techniques for rendering/mounting issues
            </li>
          </ul>
        </Typography>
      </Box>
    </>
  );
};

export default WelcomePage;
