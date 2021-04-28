import React, { FunctionComponent } from "react";
import BigPaper from "../components/BigPaper";
import SayHello from "../components/SayHello/SayHelloComponent";

const BoxIt: FunctionComponent<{
  title: string;
}> = (props) => (
  <BigPaper>
    <h1>{props.title}</h1>
    {props.children}
  </BigPaper>
);

const Playground: React.FunctionComponent = () => {
  console.log(`this is the playground`);

  return (
    <>
      <BoxIt title="My Title">
        <SayHello friends={[]} name="Stefan" />
      </BoxIt>
    </>
  );
};

export default Playground;
