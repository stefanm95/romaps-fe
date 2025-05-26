import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import { fetchHighways, fetchBorders } from '../services/api';
import BorderLayer from "./BorderLayer";
import HighwayLayer from "./HighwayLayer";
import NationalRoadsLayer from "./NationalRoadsLayer";
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

const MapView = ({selectedCity}) => {
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
        // Verifică dacă există Point
        const hasPoint = (geojson) =>
          Array.isArray(geojson)
            ? geojson.some(f => f.type === "Feature" && f.geometry?.type === "Point")
            : geojson.type === "FeatureCollection" && geojson.features.some(f => f.geometry?.type === "Point");
        console.log("Highways has Point:", hasPoint(highwaysData));
        console.log("Borders has Point:", hasPoint(bordersData));
        console.log(
          "Highways Points:",
          highwaysData?.features?.filter(f => f.geometry?.type === "Point")
        );
        setHighways(highwaysData);
        setBorders(bordersData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
      setLoading(false);
    };
    loadData();
  }, []);

 // Zoom pe oraș selectat
  function CityFlyTo() {
    const map = useMap();
    useEffect(() => {
      if (selectedCity) {
        map.setView([selectedCity.latitude, selectedCity.longitude], 10);
      }
    }, [selectedCity, map]);
    return null;
  }

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
    if (geojson.type === "FeatureCollection") {
      return {
        ...geojson,
        features: geojson.features.filter(f => f.geometry?.type !== "Point"),
      };
    }
    return geojson;
  }

  return (
    <div className="rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <MapContainer 
        center={[45.9432, 24.9668]} 
        zoom={7} 
        style={{ height: "80vh", width: "100%" }} 
        maxBounds={[[43.5, 19.5], [48.5, 30]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {borders && <GeoJSON data={filterOutPoints(borders)} style={{ color: 'green', weight: 2, fillColor: 'transparent', fillOpacity: 0 }} />}
        {highways && Array.isArray(highways) && highways.map((hw, idx) => (
          <GeoJSON key={idx} data={filterOutPoints(hw)} style={{ color: 'blue', weight: 2 }} />
        ))}
        <NationalRoadsLayer />
        {cities.map(city => (
          <Marker
            key={city.id}
            position={[city.latitude, city.longitude]}
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

