import { useEffect, useState } from "react";
import { useLanguage } from "../utils/LanguageContext";

const SidebarCities = ({ onSelectCity, selectedCity }) => {
  const [cities, setCities] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    setCities([
      { id: 1, name: "București", latitude: 44.4268, longitude: 26.1025, image_url: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Bucharest_Universitate_square.jpg" },
      { id: 2, name: "Cluj-Napoca", latitude: 46.7712, longitude: 23.6236, image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Cluj-Napoca_Central_Square.jpg" },
      { id: 3, name: "Timișoara", latitude: 45.7489, longitude: 21.2087, image_url: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Piata_Victoriei_Timisoara.jpg" },
      { id: 4, name: "Iași", latitude: 47.1585, longitude: 27.6014, image_url: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Palatul_Culturii_Iasi.jpg" },
      { id: 5, name: "Brașov", latitude: 45.6579, longitude: 25.6012, image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Brasov_Piata_Sfatului.jpg" },
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