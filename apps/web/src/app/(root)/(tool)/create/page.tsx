"use client";
import CodeEditor from "@/components/create-page/code-editor";
import { RightSideBar } from "@/components/create-page/ui-blocks/rigth-sidebar";
import  {LeftSideBar,
  CodeInfo,
} from "@/components/create-page/ui-blocks/left-sidebar";
import { useState, useCallback, useEffect } from "react";
import Hamburger from '@/components/svg-animations/hamburger'
import { motion } from 'motion/react';


const getDefaultCode = (lang: string) => {
  return lang === "python"
    ? `# Write or paste your Python code here...`
    : `// Write or paste your ${lang} code here...`;
};

const Page = () => {
  const [items, setItems] = useState<CodeInfo[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [bundleId, setBundleId] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeItem = items.find((item) => item.id === activeId);

  useEffect(() => {
    let storedId = localStorage.getItem("snippet-bundle-id");
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem("snippet-bundle-id", storedId);
    }
    setBundleId(storedId);
    console.log("Session Bundle ID:", storedId);
    const savedItems = localStorage.getItem("draft-items");
    const savedActiveId = localStorage.getItem("draft-active-id");

    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        console.error("Failed to parse saved items", e);
      }
    }

    if (savedActiveId) {
      setActiveId(savedActiveId);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("draft-items", JSON.stringify(items));
      
      if (activeId) {
        localStorage.setItem("draft-active-id", activeId);
      } else {
        localStorage.removeItem("draft-active-id");
      }
    }
  }, [items, activeId, isLoaded]);

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

  const handleSaveToRedis = useCallback(
    async (id: string) => {
      const snippetToSave = items.find((item) => item.id === id);

      if (!snippetToSave) {
        console.error("Snippet not found");
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: snippetToSave.code,
            title: snippetToSave.title,
            description: snippetToSave.description,
            language: snippetToSave.language,
            bundleId: bundleId,
          }),
        });
        if (res.ok) {
          alert(`Snippet "${snippetToSave.title}" saved successfully! ✅`);
          setItems((prev) => prev.filter((item) => item.id !== id));
          setActiveId((prevActiveId) =>
            prevActiveId === id ? null : prevActiveId,
          );
        } else {
          alert("Failed to save snippet ❌");
          console.error(await res.json());
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Network error:", error);
          alert("Error connecting to backend (Is Docker/API running?)");
        }
      }
    },
    [items, bundleId],
  );

  const handleRemove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setActiveId((prevActiveId) => (prevActiveId === id ? null : prevActiveId));
  }, []);

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleCodeChange = useCallback(
    (code: string) => {
      if (!activeId) return;
      setItems((prev) =>
        prev.map((item) => (item.id === activeId ? { ...item, code } : item)),
      );
    },
    [activeId],
  );

  const handleLanguageChange = useCallback(
    (lang: string) => {
      if (!activeId) return;
      setItems((prev) =>
        prev.map((item) =>
          item.id === activeId
            ? { ...item, language: lang, code: getDefaultCode(lang) }
            : item,
        ),
      );
    },
    [activeId],
  );

  return (
    <div className="flex h-screen w-full justify-center items-center relative bg-[#0A0A0A]">
      {/* Hamburger menu - visible below 1300px */}
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed left-1 top-28 z-50 p-2 min-[1300px]:hidden"
        aria-label="Toggle menu"
      >
        <Hamburger />
      </div>
      <motion.div
      initial={{ x: -200 }}
      animate={{ x: menuOpen ? 0 : -200 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed z-40 flex flex-col gap-4 pt-25 items-center min-[1300px]:hidden w-50 h-full bg-black left-0 top-20 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
        <RightSideBar
          language={activeItem?.language ?? ""}
          setLanguage={handleLanguageChange}
        />
        <LeftSideBar
          items={items}
          activeId={activeId}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onSelect={handleSelect}
          onSave={handleSaveToRedis}
        />
      </motion.div>

      {/* Main content - always visible */}
      <div className="flex items-center justify-center h-full w-full min-[1300px]:w-325 border-l-0 min-[1300px]:border-l-2 border-r-0 min-[1300px]:border-r-2 border-[#1f1f1f]">
        <div className="flex h-full w-full min-[1300px]:w-225 border-l-0 min-[1300px]:border-l-2 border-r-0 min-[1300px]:border-r-2 border-[#1f1f1f]">
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
      {/* Left sidebar - hidden below 1300px */}
      <div className="hidden min-[1300px]:flex absolute left-[calc(50%-650px)] w-50 top-30 bottom-0 items-center justify-center">
        <LeftSideBar
          items={items}
          activeId={activeId}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onSelect={handleSelect}
          onSave={handleSaveToRedis}
        />
      </div>
      {/* Right sidebar - hidden below 1300px */}
      <div className="hidden min-[1300px]:flex absolute right-[calc(50%-650px)] w-50 top-30 bottom-0 justify-center">
        <RightSideBar
          language={activeItem?.language ?? ""}
          setLanguage={handleLanguageChange}
        />
      </div>
    </div>
  );
};

export default Page;
