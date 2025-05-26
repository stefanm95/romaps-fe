import { GeoJSON } from "react-leaflet";

const HighwayLayer = ({ highways }) => {
  if (!highways || !Array.isArray(highways)) return null;

  return (
    <>
      {highways.map((hw, idx) => (
        <GeoJSON key={idx} data={hw} style={{ color: "green", weight: 2 }} />
      ))}
    </>
  );
};

export default HighwayLayer;