import { useState, useEffect, useMemo } from "react";
import "./style/index.css";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";

import GalleryList from "./Components/Galery/GalleryList";
import Ornement from "./Components/ornements/Ornements";
import { Link } from "react-router-dom";
import FullScreenButton from "./Components/Fullscreen";
import OrnementLeft from "./Components/ornements/OrnementLeft";
import OrnementRight from "./Components/ornements/OrnementRight";
import useTranslations from "./hooks/useTranslations";

function App() {
  const { translations, languages } = useTranslations();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );

  const data = useMemo(
    () => translations[language] || [],
    [language, translations]
  );

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const getTranslation = (key) => {
    const translations = {
      EN: {
        title: "CONSTRUCTION OF THE TITANIC",
        date: "MARCH 1909 - MAY 1912",
      },
      FR: {
        title: "CONSTRUCTION DU TITANIC",
        date: "MARS 1909 - MAI 1912",
      },
      IT: {
        title: "COSTRUZIONE DEL TITANIC",
        date: "MARZO 1909 - MAGGIO 1912",
      },
    };
    return translations[language][key];
  };

  return (
    <div className="p-4">
      <OrnementLeft />
      <OrnementRight />
      <div className="flex justify-center">
        <header className="flex  sm:flex-row justify-center items-center gap-4 w-[65%]">
          <div className="goback ripple">
            <Link to="/" className="text-2xl font-bold">
              <button className="border rounded-full w-32 p-2 text-center hover:bg-gray-200 hover:text-gray-800 transition-all bg-white ripple">
                <i className="fa-solid fa-arrow-left text-black"></i>
              </button>
            </Link>
          </div>
          <div className="grade flex flex-col gap-1 justify-center w-full text-4xl items-center">
            <h1 className="benchnine-bold">{getTranslation("title")}</h1>
            <p className="font-brygada">{getTranslation("date")}</p>
          </div>
          <div className="language flex gap-6">
            <Popover placement="bottom-end">
              <PopoverHandler>
                <button>
                  <div className="fr border rounded-full bg-white w-[60px] h-[60px] flex items-center justify-center">
                    <p className="text-black">{language}</p>
                  </div>
                </button>
              </PopoverHandler>
              <PopoverContent className="w-72 pb-0">
                {languages.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4 cursor-pointer"
                  >
                    <div
                      className={`fr border rounded-full bg-[#0d1625] w-[30px] h-[30px] flex items-center justify-center`}
                    >
                      <p className="text-white">{lang}</p>
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        {lang}
                      </Typography>
                    </div>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </header>
      </div>
      <div className="flex justify-center px-10">
        <div className="separator border mt-6 w-[80%]"></div>
      </div>
      <main className="p-10">
        <GalleryList data={data} />
      </main>
      <footer>
        <Ornement />
        <FullScreenButton />
      </footer>
    </div>
  );
}

export default App;
