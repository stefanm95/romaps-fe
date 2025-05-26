import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { fetchHighways, fetchBorders } from "../services/api";
import NationalRoadsLayer from "./NationalRoadsLayer";
import HighwayLayer from "./HighwayLayer";
import BorderLayer from "./BorderLayer";

const MapView = () => {
  const [highways, setHighways] = useState(null);
  const [borders, setBorders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [highwaysData, bordersData] = await Promise.all([
          fetchHighways(),
          fetchBorders(),
        ]);
        setHighways(highwaysData);
        setBorders(bordersData);
        console.log("Highways:", highwaysData);
        console.log("Borders:", bordersData);
      } catch (err) {
        // Handle error (optional)
        console.error("Error fetching data:", err);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={[45.9432, 24.9668]}
        zoom={7}
        style={{ height: "80vh", width: "100%" }}
        maxBounds={[
          [43.5, 19.5],
          [48.5, 30],
        ]} // SW and NE corners
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {borders && (
          <GeoJSON
            data={borders}
            style={{
              color: "green",
              weight: 2,
              fillColor: "transparent",
              fillOpacity: 0,
            }}
          />
        )}
        <BorderLayer borders={borders} />
        <HighwayLayer highways={highways} />
        <NationalRoadsLayer />
      </MapContainer>
      {loading && (
        <div className="absolute top-1/2 left-1/2 bg-white px-4 py-2 rounded shadow text-gray-700">
          Loading map data...
        </div>
      )}
    </div>
  );
};

export default MapView;
