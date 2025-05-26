import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export function CityFlyTo({ selectedCity }) {
  const map = useMap();
  useEffect(() => {
    if (selectedCity) {
      map.setView([selectedCity.latitude, selectedCity.longitude], 10);
    }
  }, [selectedCity, map]);
  return null;
}