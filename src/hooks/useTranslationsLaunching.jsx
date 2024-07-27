import { useState, useEffect } from "react";

const useTranslationsLaunching = () => {
  const [translations, setTranslations] = useState({});
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const loadTranslations = async () => {
      const files = [
        { language: "EN", path: "./Data/Lanching/LaunchingEN.json" },
        { language: "FR", path: "./Data/Lanching/LaunchingFR.json" },
        { language: "IT", path: "./Data/Lanching/LaunchingIT.json" },
      ];

      const translationsData = {};
      const languagesList = [];

      for (const { language, path } of files) {
        try {
          const response = await fetch(path);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${path}`);
          }
          const data = await response.json();
          languagesList.push(language);
          translationsData[language] = data;
        } catch (error) {
          console.error(`Failed to load translation for ${language}:`, error);
        }
      }

      setLanguages(languagesList);
      setTranslations(translationsData);
    };

    loadTranslations();
  }, []);

  return { translations, languages };
};

export default useTranslationsLaunching;
