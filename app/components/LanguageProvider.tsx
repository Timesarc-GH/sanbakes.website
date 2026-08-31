"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "en" | "ta";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
}>({ language: "en", setLanguage: () => undefined });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("san-bakes-language");
    // Restore a browser preference after hydration; the server intentionally defaults to English.
    if (saved === "ta") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState("ta");
      document.documentElement.lang = "ta";
      return;
    }
    document.documentElement.lang = "en";
  }, []);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem("san-bakes-language", next);
    document.documentElement.lang = next;
  };

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
