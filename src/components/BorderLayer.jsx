import { GeoJSON } from "react-leaflet";

const BorderLayer = ({ borders }) => {
  if (!borders) return null;

  return (
    <GeoJSON
      data={borders}
      style={{
        color: "grey",
        weight: 2,
        fillColor: "transparent",
        fillOpacity: 0,
      }}
    />
  );
};

export default BorderLayer;