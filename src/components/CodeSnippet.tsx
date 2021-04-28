import Prism from "prismjs";
import React, { useEffect } from "react";

interface CodeProps {
  children: string;
}

const CodeSnippet: React.FunctionComponent<CodeProps> = (props: CodeProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="Code line-numbers">
      <pre>
        <code className="language-tsx">{props.children}</code>
      </pre>
    </div>
  );
};

export default CodeSnippet;
