import { Link } from "react-router-dom";

const GalleryList = ({ data }) => {
  return (
    <div className="gallery-list mt-10 px-10">
      {data?.map((gallery) => (
        <Link
          to={`/galerie/${gallery?.id}`}
          className="gallery-link ripple"
          key={gallery?.id}
        >
          <div key={gallery?.id} className="gallery-item">
            <img src={gallery?.mainImage} alt={gallery?.title} />
            <h3 className="benchnine">{gallery?.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GalleryList;
