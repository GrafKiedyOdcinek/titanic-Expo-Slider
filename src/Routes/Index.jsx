import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import GalleryDetail from "../Components/Galery/GalleryDetail";
import Intro from "../Intro";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/construction" element={<App />} />
        <Route path="/launching" element={<App />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/galerie/:id" element={<GalleryDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
