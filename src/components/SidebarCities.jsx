import { useEffect, useState } from "react";
import { useLanguage } from "../utils/LanguageContext";
import bucurestiImg from '../assets/img/bucuresti.jpg';
import clujImg from '../assets/img/cluj.jpg';
import timisoaraImg from '../assets/img/timisoara.jpg';
import iasiImg from '../assets/img/iasi.jpg';
import brasovImg from '../assets/img/brasov.jpg';


const SidebarCities = ({ onSelectCity, selectedCity }) => {
  const [cities, setCities] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    setCities([
      { id: 1, name: "București", latitude: 44.4268, longitude: 26.1025, image_url: bucurestiImg },
  { id: 2, name: "Cluj-Napoca", latitude: 46.7712, longitude: 23.6236, image_url: clujImg },
  { id: 3, name: "Timișoara", latitude: 45.7489, longitude: 21.2087, image_url: timisoaraImg },
  { id: 4, name: "Iași", latitude: 47.1585, longitude: 27.6014, image_url: iasiImg },
  { id: 5, name: "Brașov", latitude: 45.6579, longitude: 25.6012, image_url: brasovImg },
    ]);
  }, []);

  return (
    <aside className="bg-gray-100 border-r w-64 h-full overflow-y-auto flex-shrink-0">
      <h5 className="font-semibold mb-3 p-4">{t.citiesTitle || "Orașe"}</h5>
      <ul className="space-y-2 px-4">
        {cities.map((city) => (
          <li
            key={city.id}
            className={`cursor-pointer p-2 rounded ${selectedCity?.id === city.id ? "bg-blue-200" : "hover:bg-blue-50"}`}
            onClick={() => onSelectCity(city)}
          >
            {city.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarCities;