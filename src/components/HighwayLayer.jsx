import { GeoJSON, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

const HighwayLayer = ({ highways, filterRef }) => {
  const map = useMap();

  // Normalize filterRef
  const filter = filterRef?.trim().toUpperCase();

  // Filter features based on the 'ref' property
  const filteredHighways =
    highways && Array.isArray(highways)
      ? highways.map((hw) => {
          if (!filter) return hw;
          const matchingFeatures = hw.features?.filter((feature) => {
            const ref = feature.properties?.ref;
            if (!ref) return false;
            // Support multiple refs like "A1;A3"
            const refs = ref.split(";").map((r) => r.trim().toUpperCase());
            return refs.includes(filter);
          });
          return {
            ...hw,
            features: matchingFeatures,
          };
        })
      : [];

  // Auto-zoom to filtered highway if applicable
  useEffect(() => {
    if (filter && filteredHighways.length > 0) {
      const allFeatures = filteredHighways.flatMap((hw) => hw.features || []);
      if (allFeatures.length > 0) {
        const geoJsonLayer = L.geoJSON({
          type: "FeatureCollection",
          features: allFeatures,
        });
        map.fitBounds(geoJsonLayer.getBounds(), { padding: [20, 20] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, JSON.stringify(filteredHighways), map]);

  if (!highways || !Array.isArray(highways)) return null;

  return (
    <>
      {filteredHighways.map((hw, idx) => {
        if (!hw.features || hw.features.length === 0) return null;
        return (
          <GeoJSON key={idx} data={hw} style={{ color: "green", weight: 2 }} />
        );
      })}
    </>
  );
};

export default HighwayLayer;
