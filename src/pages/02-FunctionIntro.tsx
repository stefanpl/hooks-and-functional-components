import { Typography } from "@material-ui/core";
import React from "react";
import CodeSnippet from "../components/CodeSnippet";

const FunctionIntro: React.FunctionComponent = () => (
  <>
    <Typography variant="h1">What are function components</Typography>
    <Typography variant="subtitle1">
      Let&apos;s start at the beginning
    </Typography>
    <CodeSnippet>const some = 123;</CodeSnippet>
  </>
);

export default FunctionIntro;
