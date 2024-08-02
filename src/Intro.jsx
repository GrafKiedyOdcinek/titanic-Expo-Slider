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
import FullScreenButton from "./Components/Fullscreen";
import OrnementLeft from "./Components/ornements/OrnementLeft";
import OrnementRight from "./Components/ornements/OrnementRight";
import useTranslations from "./hooks/useTranslations";
import TitleTranslation from "../public/Data/TitleTranslation.json";

const Intro = () => {
  const { languages } = useTranslations();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const getTranslation = (key) => {
    const translationItem = TitleTranslation.find(
      (item) => item?.translation?.[key]
    );

    return translationItem.translation[key] || key;
  };

  return (
    <div className="p-4">
      <OrnementLeft />
      <OrnementRight />
      <div className="flex justify-center">
        <header className="flex  sm:flex-row justify-center items-center gap-4 w-[65%]">
          <div className="grade flex flex-col gap-1 justify-center w-full text-4xl items-center">
            <h1 className="benchnine-bold">{getTranslation(language)}</h1>
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
      <div className="flex justify-center">
        <div className="separator border mt-6 w-[80%]"></div>
      </div>
      <main className="p-10 flex justify-center items-center gap-10">
        <div className="construction w-[40%] ripple-intro">
          <Link to="/construction">
            <h2 className="times text-center p-10">
              {language === "FR" ? "CONSTRUCTION" : "CONSTRUCTION"}
            </h2>
            <div className=" border rounded-2xl introImg">
              <img src={CONSTRUCTION} alt="" />
            </div>
          </Link>
        </div>
        <div className="lanching w-[40%] ripple-intro">
          <Link to="/launching">
            <h2 className="times text-center p-10">
              {language === "FR" ? "LANCEMENT" : "LAUNCHING"}
            </h2>
            <div className=" border rounded-2xl introImg">
              <img src={LAUNCHING} alt="" />
            </div>
          </Link>
        </div>
      </main>
      <footer>
        <Ornement />
        <FullScreenButton />
      </footer>
    </div>
  );
};

export default Intro;
