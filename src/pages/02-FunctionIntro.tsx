import { Link, Typography } from "@material-ui/core";
import React from "react";
import BigPaper from "../components/BigPaper";
import CodeSnippet from "../components/CodeSnippet";
import MostSimpleComponent from "../components/exampleComponents/MostSimpleComponent/MostSimpleComponentWithStringRepresentation";

const FunctionIntro: React.FunctionComponent = () => (
  <>
    <Typography variant="h1">What are function components</Typography>
    <Typography variant="subtitle1">
      Let&apos;s start at the beginning
    </Typography>
    <CodeSnippet>{MostSimpleComponent.stringRepresentation}</CodeSnippet>
    <Typography variant="subtitle2">
      (let&apos;s have a quick look at the typing madness here, although
      that&apos;s just a side note.)
    </Typography>

    <Typography variant="h2">A quick word on JSX</Typography>
    <Typography variant="body1">
      <Link href="https://reactjs.org/docs/introducing-jsx.html#jsx-represents-objects">
        The react docs have us covered here.
      </Link>
    </Typography>

    <Typography variant="h2">
      A function component is (just) a JavaScript function!
    </Typography>

    <Typography variant="body1">As soon as we pass arguments </Typography>

    <BigPaper>huhu</BigPaper>
  </>
);

export default FunctionIntro;
