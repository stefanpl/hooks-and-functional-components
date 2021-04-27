import Prism from "prismjs";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

interface CodeProps {
  children: string;
}

const CodeSnippet: React.FunctionComponent<CodeProps> = (props: CodeProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <>
      <Helmet>
        <link
          href="https://unpkg.com/prismjs@1.23.0/themes/prism.css"
          rel="stylesheet"
        />
      </Helmet>
      <div className="Code">
        <pre>
          <code className="language-tsx">{props.children}</code>
        </pre>
      </div>
    </>
  );
};

export default CodeSnippet;
