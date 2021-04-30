import clsx from "clsx";
import React, { CSSProperties, useEffect, useRef } from "react";

export interface SideEffectyProps {
  name: string;
  isItReallyTrue: boolean;
  someNumber: number;
  aFunction: () => void;
  friends: string[];
  style: CSSProperties;
}

const animationClasses = ["animate__animated", "animate__shakeX"];

export const seProps: SideEffectyProps = {
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
  const { name, someNumber, aFunction, friends, style, isItReallyTrue } = props;

  useEffect(() => {
    if (refObj.current) {
      refObj.current.classList.remove(...animationClasses);
    }
    setTimeout(() => {
      if (refObj.current) {
        refObj.current.classList.add(...animationClasses);
      }
    }, 50);
  }, [name, someNumber, aFunction, friends, style, isItReallyTrue]);

  return (
    <h1 ref={refObj} className={clsx(animationClasses)}>
      Much side effect
    </h1>
  );
};

export default SideEffecty;
