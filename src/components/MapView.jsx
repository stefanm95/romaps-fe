import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import { fetchHighways, fetchBorders } from "../services/api";
import { CityFlyTo } from "../utils/mapHelpers";
import BorderLayer from "./BorderLayer";
import HighwayLayer from "./HighwayLayer";
import NationalRoadsLayer from "./NationalRoadsLayer";
import ToggleSwitch from "./ToggleSwitch";
import bucurestiImg from '../assets/img/bucuresti.jpg';
import clujImg from '../assets/img/cluj.jpg';
import timisoaraImg from '../assets/img/timisoara.jpg';
import iasiImg from '../assets/img/iasi.jpg';
import brasovImg from '../assets/img/brasov.jpg';

const cities = [
  { id: 1, name: "București", latitude: 44.4268, longitude: 26.1025, image_url: bucurestiImg },
  { id: 2, name: "Cluj-Napoca", latitude: 46.7712, longitude: 23.6236, image_url: clujImg },
  { id: 3, name: "Timișoara", latitude: 45.7489, longitude: 21.2087, image_url: timisoaraImg },
  { id: 4, name: "Iași", latitude: 47.1585, longitude: 27.6014, image_url: iasiImg },
  { id: 5, name: "Brașov", latitude: 45.6579, longitude: 25.6012, image_url: brasovImg },
];

const MapView = ({ selectedCity }) => {
  const [highways, setHighways] = useState(null);
  const [borders, setBorders] = useState(null);
  const [loading, setLoading] = useState(true);

  // Toggle state
  const [showHighways, setShowHighways] = useState(true);
  const [showNationalRoads, setShowNationalRoads] = useState(false);
  const markerRefs = useRef({});

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


  function filterOutPoints(geojson) {
    if (Array.isArray(geojson)) {
      return geojson.map(fc =>
        fc.type === "FeatureCollection"
          ? {
              ...fc,
              features: fc.features.filter(f => f.geometry?.type !== "Point"),
            }
          : fc
      );
    }
    if (geojson?.type === "FeatureCollection") {
      return {
        ...geojson,
        features: geojson.features.filter(f => f.geometry?.type !== "Point"),
      };
    }
    return geojson;
  }


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
        {cities.map(city => (
          <Marker
            key={city.id}
            position={[city.latitude, city.longitude]}
            ref={ref => {
              if (ref) markerRefs.current[city.id] = ref;
            }}
          >
            <Popup>
              <b>{city.name}</b><br />
              <img src={city.image_url} alt={city.name} width={180} />
            </Popup>
          </Marker>
        ))}
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


