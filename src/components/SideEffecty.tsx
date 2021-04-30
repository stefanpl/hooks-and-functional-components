import React, { CSSProperties, useEffect, useRef } from "react";

export interface SideEffectyProps {
  name: string;
  isItReallyTrue: boolean;
  someNumber: number;
  aFunction: () => void;
  friends: string[];
  style: CSSProperties;
}

const animationClass = "animate__animated animate__shakeX";

const seProps: SideEffectyProps = {
  aFunction: () => {},
  friends: ["🐳", "🦄", "🐒", "🦈"],
  someNumber: 100,
  isItReallyTrue: true,
  name: "effecty",
  style: {
    backgroundColor: "black",
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
    style,
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
  }, [name, someNumber, aFunction, friends, style, isItReallyTrue]);

  return (
    <h1 ref={refObj} className="animate__animated animate__shakeX">
      Much side effect
    </h1>
  );
};

export default SideEffecty;
