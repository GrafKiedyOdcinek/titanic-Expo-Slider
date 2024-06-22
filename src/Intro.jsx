import { useState } from "react";
import "./style/index.css";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";
import Ornement from "./Components/ornements/Ornements";
import CONSTRUCTION from "./assets/Construction/intro.jpg";
import LAUNCHING from "./assets/Construction/launching.jpg";
import { Link } from "react-router-dom";
const Intro = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );

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
      <main className="p-10 flex justify-between items-center gap-10">
        <div className="construction w-1/2">
          <Link to="/construction">
            <h2 className="text-4xl font-bold text-center p-10">
              {language === "FR" ? "CONSTRUCTION" : "CONSTRUCTION"}
            </h2>
            <div className=" border rounded-2xl introImg">
              <img src={CONSTRUCTION} alt="" />
            </div>
          </Link>
        </div>
        <div className="lanching w-1/2">
          <Link to="/launching">
            <h2 className="text-4xl font-bold text-center p-10">
              {language === "FR" ? "MISE A L'EAU" : "LAUNCHING"}
            </h2>
            <div className=" border rounded-2xl introImg">
              <img src={LAUNCHING} alt="" />
            </div>
          </Link>
        </div>
      </main>
      <Ornement />
    </div>
  );
};

export default Intro;
