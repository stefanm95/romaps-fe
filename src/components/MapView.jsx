import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { fetchHighways, fetchBorders } from '../services/api';

const cities = [
  { id: 1, name: "București", latitude: 44.4268, longitude: 26.1025, image_url: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Bucharest_Universitate_square.jpg" },
  { id: 2, name: "Cluj-Napoca", latitude: 46.7712, longitude: 23.6236, image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Cluj-Napoca_Central_Square.jpg" },
  { id: 3, name: "Timișoara", latitude: 45.7489, longitude: 21.2087, image_url: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Piata_Victoriei_Timisoara.jpg" },
  { id: 4, name: "Iași", latitude: 47.1585, longitude: 27.6014, image_url: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Palatul_Culturii_Iasi.jpg" },
  { id: 5, name: "Brașov", latitude: 45.6579, longitude: 25.6012, image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Brasov_Piata_Sfatului.jpg" },
];

const MapView = ({ selectedCity }) => {
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
        console.log('Highways:', highwaysData);
        console.log('Borders:', bordersData);
      } catch (err) {
        // Handle error (optional)
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

  return (
    <div className="rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <MapContainer 
        center={[45.9432, 24.9668]} 
        zoom={7} 
        style={{ height: "80vh", width: "100%" }} 
        maxBounds={[[43.5, 19.5], [48.5, 30]]} // SW and NE corners
        maxBoundsViscosity={1.0}
    >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {borders && <GeoJSON data={borders} style={{ color: 'green', weight: 2, fillColor: 'transparent', fillOpacity: 0 }} />}
        {highways && Array.isArray(highways) && highways.map((hw, idx) => (
          <GeoJSON key={idx} data={hw} style={{ color: 'blue', weight: 2 }} />
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
