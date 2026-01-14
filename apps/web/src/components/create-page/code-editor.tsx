"use client";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { darcula } from "@uiw/codemirror-theme-darcula";

//languages
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { rust } from "@codemirror/lang-rust";


const CodeEditor = () => {
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>("//Write or paste your code here");

  const getExtension = () => {
    switch (language) {
      case "javascript":
        return javascript({ jsx: true });
      case "typescript":
        return javascript({ typescript: true });
      case "python":
        return python();
      case "cpp":
        return cpp();
      case "java":
        return java();
      case "rust":
        return rust();
      default:
        return []; 
    }
  };
  return (
    <div className="h-full w-full">
        <CodeMirror
          value={code}
          width="100%"
          height="100%"
          theme={darcula}
          extensions={[javascript({ jsx: true })]} 
          onChange={(value) => setCode(value)}
          className="h-full w-full text-base"
        />
    </div>
  )
};

export default CodeEditor;
