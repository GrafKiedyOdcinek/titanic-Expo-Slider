import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";
import galeryDataEN from "../../Data/galerieEN.json";
import galeryDataFR from "../../Data/galerieFR.json";
import InfiniteScroll from "react-infinite-scroll-component";

const GalleryDetail = () => {
  const { id } = useParams();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );
  const [items, setItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const data = language === "FR" ? galeryDataFR : galeryDataEN;
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

  const handleImageClick = (url, description) => {
    setSelectedImage({ url, description });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // const getRandomWidth = () => {
  //   const min = 250;
  //   const max = 1000;
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };

  return (
    <div className="p-4">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link to="/construction" className="text-2xl font-bold">
          <button className="border rounded-full w-32 p-2 text-center hover:bg-gray-200 hover:text-gray-800 transition-all bg-white">
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
        <div className="gallery-container">
          <InfiniteScroll
            dataLength={items.length}
            hasMore={true}
            loader={null}
            scrollableTarget="scrollableDiv"
            horizontal={true}
          >
            <div id="scrollableDiv" className="gallery-scroll">
              <div className="gallery-row">
                {items
                  .filter((_, index) => index % 2 === 0)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="gallery-image"
                      onClick={() =>
                        handleImageClick(item.url, item.description)
                      }
                      style={{ height: "400px" }}
                    >
                      <img
                        src={item?.url}
                        alt={`${item?.description} ${index + 1}`}
                        style={{ height: "100%" }}
                      />
                    </div>
                  ))}
              </div>
              <div className="gallery-row">
                {items
                  .filter((_, index) => index % 2 !== 0)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="gallery-image"
                      onClick={() =>
                        handleImageClick(item.url, item.description)
                      }
                      style={{ height: "400px" }}
                    >
                      <img
                        src={item?.url}
                        alt={`${item?.description} ${index + 1}`}
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
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt="Selected" />
          </div>
          <div className="flex justify-center items-center">
            <p className="text-xl text-center">{selectedImage.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryDetail;
