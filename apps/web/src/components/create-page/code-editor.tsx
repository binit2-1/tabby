"use client";
import { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { darcula } from "@uiw/codemirror-theme-darcula";

//languages
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { rust } from "@codemirror/lang-rust";

interface CodeEditorProps {
  language: string;
  code: string;
  onCodeChange: (code: string) => void;
}

const CodeEditor = ({ language, code, onCodeChange }: CodeEditorProps) => {
  const ext = useMemo(() => {
    switch (language) {
      case "javascript":
        return javascript({ jsx: true });
      case "typescript":
        return javascript({ typescript: true });
      case "python":
        return python();
      case "cpp":
      case "c":
        return cpp();
      case "java":
        return java();
      case "rust":
        return rust();
      default:
        return javascript({ jsx: true });
    }
  }, [language]);

  return (
    <div className="h-full w-full">
      <CodeMirror
        value={code}
        width="100%"
        height="100%"
        theme={darcula}
        extensions={[ext]}
        onChange={(value) => onCodeChange(value)}
        className="h-full w-full text-base"
      />
    </div>
  );
};

export default CodeEditor;
