import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { fetchHighways, fetchBorders } from "../services/api";
import { CityFlyTo } from "../utils/mapHelpers";
import BorderLayer from "./BorderLayer";
import HighwayLayer from "./HighwayLayer";
import NationalRoadsLayer from "./NationalRoadsLayer";
import ToggleSwitch from "./ToggleSwitch";

const MapView = ({ selectedCity }) => {
  const [highways, setHighways] = useState(null);
  const [borders, setBorders] = useState(null);
  const [loading, setLoading] = useState(true);

  // Toggle state
  const [showHighways, setShowHighways] = useState(true);
  const [showNationalRoads, setShowNationalRoads] = useState(false);

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
    <div className="rounded-lg shadow-lg overflow-hidden border border-gray-200 relative">
      {/* Toggle controls */}
      <div className="absolute z-10 top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm p-4 rounded-xl shadow-lg space-y-3">
        <ToggleSwitch
          label="Highways"
          checked={showHighways}
          onChange={() => setShowHighways((v) => !v)}
        />
        <ToggleSwitch
          label="National Roads"
          checked={showNationalRoads}
          onChange={() => setShowNationalRoads((v) => !v)}
        />
      </div>
      <MapContainer
        center={[45.9432, 24.9668]}
        zoom={7}
        style={{ height: "80vh", width: "100%" }}
        maxBounds={[
          [43.5, 19.5],
          [48.5, 30],
        ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <BorderLayer borders={borders} />
        {showHighways && <HighwayLayer highways={highways} />}
        {showNationalRoads && <NationalRoadsLayer />}
        {/* Add CityFlyTo here */}
        <CityFlyTo selectedCity={selectedCity} />
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
