// src/components/NationalRoadsLayer.jsx

import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { fetchNationalRoads, fetchNationalRoadsByRef } from "../services/api";

const NationalRoadsLayer = ({ filterRef }) => {
  const [loading, setLoading] = useState(false);
  const [roadsData, setRoadsData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    const loadRoads = async () => {
      setLoading(true);
      setError(null);

      try {
        let fetched;
        if (filterRef?.trim()) {
          // If user typed something, ask backend for exactly that ref
          fetched = await fetchNationalRoadsByRef(
            filterRef.trim().toUpperCase()
          );
          // (backend returns a single FeatureCollection or null if none found)
        } else {
          // If no filter, load all roads
          const all = await fetchNationalRoads();
          // Your API returns an array of FeatureCollections (one per file). We merge them here:
          if (Array.isArray(all)) {
            const mergedFeatures = all.flatMap((fc) => fc.features || []);
            fetched = {
              type: "FeatureCollection",
              features: mergedFeatures,
            };
          } else {
            // In case your API returns a single FeatureCollection directly
            fetched = all;
          }
        }

        if (!isCancelled) {
          setRoadsData(fetched);
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
  }, [filterRef]);

  // Show loading overlay
  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 bg-white px-4 py-2 rounded shadow text-gray-700 z-[1000]">
        Loading roads data...
      </div>
    );
  }

  // If backend returned null or no features, render nothing
  if (!roadsData || !roadsData.features || roadsData.features.length === 0) {
    return null;
  }

  // Otherwise render the GeoJSON layer
  return <GeoJSON data={roadsData} style={{ color: "red", weight: 2 }} />;
};

export default NationalRoadsLayer;
