import { useEffect, useState } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import { fetchNationalRoads, fetchNationalRoadsByRef } from "../services/api";
import L from "leaflet";

const NationalRoadsLayer = ({ filterRef }) => {
  const [loading, setLoading] = useState(false);
  const [roadsData, setRoadsData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const map = useMap(); 

  useEffect(() => {
    let isCancelled = false;
    const loadRoads = async () => {
      setLoading(true);
      setError(null);

      try {
        let fetched;
        if (filterRef?.trim()) {
          fetched = await fetchNationalRoadsByRef(
            filterRef.trim().toUpperCase()
          );
        } else {
          const all = await fetchNationalRoads();
          if (Array.isArray(all)) {
            const mergedFeatures = all.flatMap((fc) => fc.features || []);
            fetched = { type: "FeatureCollection", features: mergedFeatures };
          } else {
            fetched = all;
          }
        }

        if (!isCancelled) {
          setRoadsData(fetched);

          // 🔍 Auto-zoom to filtered result if applicable
          if (
            filterRef?.trim() &&
            fetched?.features &&
            fetched.features.length > 0
          ) {
            const geoJsonLayer = L.geoJSON(fetched);
            map.fitBounds(geoJsonLayer.getBounds(), { padding: [20, 20] });
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Error loading national roads:", err);
          setError(err);
          setRoadsData(null);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadRoads();
    return () => {
      isCancelled = true;
    };
  }, [filterRef, map]);

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 bg-white px-4 py-2 rounded shadow text-gray-700 z-[1000]">
        Loading roads data...
      </div>
    );
  }

  if (!roadsData || !roadsData.features || roadsData.features.length === 0) {
    return null;
  }

  return <GeoJSON data={roadsData} style={{ color: "red", weight: 1 }} />;
};

export default NationalRoadsLayer;
