import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { fetchNationalRoads } from "../services/api";

const NationalRoadsLayer = () => {
  const [loading, setLoading] = useState(true);
  const [roads, setRoads] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const roadsData = await fetchNationalRoads();
        setRoads(roadsData);
      } catch (err) {
        console.error("Error loading roads data:", err);
      }
      setLoading(false);
    };
    loadData();
  }, []); // Only run once on mount

  if (!roads) return null;
  return (
    <>
      {loading && (
        <div className="absolute top-1/2 left-1/2 bg-white px-4 py-2 rounded shadow text-gray-700">
          Loading roads data...
        </div>
      )}
      {Array.isArray(roads)
        ? roads.map((road, idx) => (
            <GeoJSON key={idx} data={road} style={{ color: "orange", weight: 2 }} />
          ))
        : <GeoJSON data={roads} style={{ color: "orange", weight: 2 }} />
      }
    </>
  );
};

export default NationalRoadsLayer;
