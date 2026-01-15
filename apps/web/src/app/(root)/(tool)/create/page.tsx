"use client";
import CodeEditor from "@/components/create-page/code-editor";
import { RightSideBar } from "@/components/create-page/ui-blocks/rigth-sidebar";
import LeftSideBar, { CodeInfo } from "@/components/create-page/ui-blocks/left-sidebar";
import { useState, useCallback } from "react";

const getDefaultCode = (lang: string) => {
  return lang === "python"
    ? `# Write or paste your Python code here...`
    : `// Write or paste your ${lang} code here...`;
};

const Page = () => {
  const [items, setItems] = useState<CodeInfo[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeItem = items.find((item) => item.id === activeId);

  const handleAdd = useCallback((title: string, description: string) => {
    const id = crypto.randomUUID();
    const newItem: CodeInfo = {
      id,
      title,
      description,
      code: getDefaultCode("javascript"),
      language: "javascript",
    };
    setItems((prev) => [...prev, newItem]);
    setActiveId(id);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setActiveId((prevActiveId) => (prevActiveId === id ? null : prevActiveId));
  }, []);

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleCodeChange = useCallback((code: string) => {
    if (!activeId) return;
    setItems((prev) =>
      prev.map((item) => (item.id === activeId ? { ...item, code } : item))
    );
  }, [activeId]);

  const handleLanguageChange = useCallback((lang: string) => {
    if (!activeId) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === activeId
          ? { ...item, language: lang, code: getDefaultCode(lang) }
          : item
      )
    );
  }, [activeId]);

  return (
    <div className="flex h-screen w-full justify-center items-center relative">
      <div className="flex items-center justify-center h-full w-325 border-l-2 border-r-2 border-[#1f1f1f]">
        <div className="flex h-full w-225 border-l-2 border-r-2 border-[#1f1f1f]">
          <div className="flex flex-1 justify-center items-center mt-26.5 overflow-hidden">
            {activeItem ? (
              <CodeEditor
                language={activeItem.language}
                code={activeItem.code}
                onCodeChange={handleCodeChange}
              />
            ) : (
              <div className="text-white font-plus-jakarta-sans font-medium text-center px-4">
                Add a code snippet from the left sidebar to get started
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Left sidebar */}
      <div className="absolute left-[calc(50%-650px)] w-50 top-30 bottom-0 flex items-center justify-center">
        <LeftSideBar
          items={items}
          activeId={activeId}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onSelect={handleSelect}
        />
      </div>
      {/* Right sidebar */}
      <div className="absolute right-[calc(50%-650px)] w-50 top-30 bottom-0 flex justify-center">
        <RightSideBar
          language={activeItem?.language ?? ""}
          setLanguage={handleLanguageChange}
        />
      </div>
    </div>
  );
};

export default Page;