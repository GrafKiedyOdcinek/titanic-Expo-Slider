import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import GalleryDetail from "../Components/Galery/GalleryDetail";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/galerie/:id" element={<GalleryDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
