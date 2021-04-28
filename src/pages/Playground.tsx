import React from "react";

const Playground: React.FunctionComponent = () => {
  console.log("hello playground");

  return (
    <>
      <MyUnicornComponent />
      {theWholeGang.map((Member) => (
        <Member />
      ))}
    </>
  );
};

export default Playground;
