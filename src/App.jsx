import { useState, useEffect } from "react";
import "./style/index.css";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";

import galeryDataEN from "./Data/galerieEN.json";
import galeryDataFR from "./Data/galerieFR.json";
import GalleryList from "./Components/Galery/GalleryList";
import Ornement from "./Components/ornements/Ornements";
import { Link } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );

  useEffect(() => {
    const loadData = () => {
      if (language === "FR") {
        setData(galeryDataFR);
      } else {
        setData(galeryDataEN);
      }
    };
    loadData();
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

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
    };
    return translations[language][key];
  };

  return (
    <div className="p-4">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
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
              <div
                onClick={() => changeLanguage("FR")}
                className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4 cursor-pointer"
              >
                <div className="fr border rounded-full bg-[#0d1625] w-[30px] h-[30px] flex items-center justify-center">
                  <p className="text-white">FR</p>
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Français
                  </Typography>
                </div>
              </div>
              <div
                onClick={() => changeLanguage("EN")}
                className="flex items-center gap-4 border-b border-blue-gray-50 pb-4 cursor-pointer"
              >
                <div className="fr border rounded-full bg-[#0d1625] w-[30px] h-[30px] flex items-center justify-center">
                  <p className="text-white">EN</p>
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    English
                  </Typography>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      <div className="separator border mt-6"></div>
      <main className="p-10">
        <GalleryList data={data} />
      </main>
      <Ornement />
    </div>
  );
}

export default App;
