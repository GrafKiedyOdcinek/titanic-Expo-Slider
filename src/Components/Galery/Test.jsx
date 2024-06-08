import { Grid } from "react-visual-grid";
import "react-visual-grid/dist/react-visual-grid.css";

const images = Array.from({ length: 30 }, (_, index) => ({
  src: `https://picsum.photos/id/${index + 1}/800/600`,
}));

const Test = () => {
  return (
    <div>
      <Grid images={images} width={800} height={600} />
    </div>
  );
};

export default Test;
