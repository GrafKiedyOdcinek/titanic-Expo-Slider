import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";
import InfiniteScroll from "react-infinite-scroll-component";
import OrnementLeft from "../ornements/OrnementLeft";
import OrnementRight from "../ornements/OrnementRight";
import useTranslationsLaunching from "../../hooks/useTranslationsLaunching";

const GalleryLaunching = () => {
  const { id } = useParams();
  const { translations, languages } = useTranslationsLaunching();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );
  const [items, setItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const data = translations[language] || [];
  const gallery = data.find((gallery) => gallery.id.toString() === id);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    if (gallery) {
      setItems(gallery.images);
    }
  }, [gallery]);

  if (!gallery) {
    return <p>Gallery not found</p>;
  }

  const handleImageClick = (index) => {
    setSelectedImage(items[index]);
    setCurrentIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setCurrentIndex(null);
  };

  const handlePrevImage = () => {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    setSelectedImage(items[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNextImage = () => {
    const newIndex = (currentIndex + 1) % items.length;
    setSelectedImage(items[newIndex]);
    setCurrentIndex(newIndex);
  };

  const evenItems = items.filter((_, index) => index % 2 === 0);
  const oddItems = items.filter((_, index) => index % 2 !== 0);

  return (
    <div className="p-4">
      <OrnementLeft />
      <OrnementRight />
      <div className="flex justify-center">
        <header className="flex  sm:flex-row justify-center items-center gap-4 w-[65%]">
          <Link to="/launching" className="text-2xl font-bold">
            <button className="border rounded-full w-32 p-2 text-center hover:bg-gray-200 hover:text-gray-800 transition-all bg-white ripple">
              <i className="fa-solid fa-arrow-left text-black"></i>
            </button>
          </Link>
          <div className="grade flex flex-col gap-1 justify-center w-full text-4xl items-center">
            <h1 className="benchnine-bold uppercase text-center">
              {gallery?.title}
            </h1>
            <p className="font-brygada text-center">{gallery?.date}</p>
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
      <main className="p-10 px-10">
        <div className="gallery-container px-10">
          <InfiniteScroll
            dataLength={items.length}
            hasMore={true}
            loader={null}
            scrollableTarget="scrollableDiv"
            horizontal={true}
          >
            <div id="scrollableDiv" className="gallery-scroll">
              <div className="gallery-row">
                {evenItems.map((item, index) => (
                  <div
                    key={index}
                    className="gallery-image"
                    onClick={() => handleImageClick(index * 2)}
                    style={{ height: "400px" }}
                  >
                    <img
                      src={item?.url}
                      alt={`${item?.description} ${index * 2 + 1}`}
                      style={{ height: "100%" }}
                    />
                  </div>
                ))}
              </div>
              <div className="gallery-row">
                {oddItems.map((item, index) => (
                  <div
                    key={index}
                    className="gallery-image"
                    onClick={() => handleImageClick(index * 2 + 1)}
                    style={{ height: "400px" }}
                  >
                    <img
                      src={item?.url}
                      alt={`${item?.description} ${index * 2 + 2}`}
                      style={{ height: "100%" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </main>

      {selectedImage && (
        <div className="modal relative" onClick={handleCloseModal}>
          <div className="close">
            <button
              className="border rounded-full w-32 p-2 text-center hover:bg-gray-200 hover:text-gray-800 transition-all bg-white ripple"
              onClick={handleCloseModal}
            >
              <i className="fa-solid fa-times text-black"></i>
            </button>
          </div>
          <div
            className="modal-content flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="border rounded-full w-16 h-16 flex justify-center items-center text-center hover:bg-gray-200 hover:text-gray-800 transition-all bg-white absolute left-[-3rem] ripple"
              onClick={handlePrevImage}
            >
              <i className="fa-solid fa-arrow-left text-black"></i>
            </button>
            <img
              src={selectedImage.url}
              alt="Selected"
              className="max-h-full max-w-full"
            />
            <button
              className="border rounded-full w-16 h-16 flex justify-center items-center text-center hover:bg-gray-200 hover:text-gray-800 transition-all bg-white absolute right-[-3rem] ripple"
              onClick={handleNextImage}
            >
              <i className="fa-solid fa-arrow-right text-black"></i>
            </button>
          </div>
          <div className="flex justify-center items-center mt-4">
            <p className="text-xl text-center">{selectedImage.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryLaunching;
