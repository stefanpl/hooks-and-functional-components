import React, { useEffect, useRef } from "react";

export interface SideEffectyProps {
  name: string;
  isItReallyTrue: boolean;
  someNumber: number;
  aFunction: () => void;
  friends: string[];
  nestedObject: {
    anotherName: string;
  };
}

const animationClass = "animate__animated animate__shakeX";

const seProps: SideEffectyProps = {
  aFunction: () => {},
  friends: ["🐳", "🦄", "🐒", "🦈"],
  someNumber: 100,
  isItReallyTrue: true,
  name: "effecty",
  nestedObject: {
    anotherName: "nesty",
  },
};

const SideEffecty: React.FunctionComponent<SideEffectyProps> = (
  props: SideEffectyProps
) => {
  console.log(`effecty rendering`);
  const refObj = useRef<HTMLHeadingElement>(null);
  const {
    name,
    someNumber,
    aFunction,
    friends,
    nestedObject,
    isItReallyTrue,
  } = props;

  useEffect(() => {
    if (refObj.current) {
      refObj.current.classList.remove(...animationClass.split(" "));
    }
    setTimeout(() => {
      if (refObj.current) {
        refObj.current.classList.add(...animationClass.split(" "));
      }
    });
  }, [name, someNumber, aFunction, friends, nestedObject, isItReallyTrue]);

  return (
    <h1 ref={refObj} className="animate__animated animate__shakeX">
      Much side effect
    </h1>
  );
};

export default SideEffecty;
