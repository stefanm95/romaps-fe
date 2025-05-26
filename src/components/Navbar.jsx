import { useLanguage } from "../utils/LanguageContext";
import { useState } from "react";

const Navbar = () => {
  // eslint-disable-next-line no-unused-vars
  const { lang, setLang, t } = useLanguage();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between z-50 relative">
      <div className="font-bold text-lg">{t.navbarTitle}</div>
      <ul className="flex gap-4 items-center">
        <li className="relative">
          <button onClick={() => handleDropdown("forecast")} className="hover:underline">{t.trafficForecast}</button>
          {openDropdown === "forecast" && (
            <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg z-50">
              <li>
                <a className="block px-4 py-2 hover:bg-gray-100" href="#">
                  {t.trafficCalendar}
                </a>
              </li>
            </ul>
          )}
        </li>
        <li className="relative">
          <button onClick={() => handleDropdown("freight")} className="hover:underline">{t.freightTraffic}</button>
          {openDropdown === "freight" && (
            <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg z-50">
              <li>
                <a className="block px-4 py-2 hover:bg-gray-100" href="#">
                  {t.generalLimitations}
                </a>
              </li>
              <li>
                <a className="block px-4 py-2 hover:bg-gray-100" href="#">
                  {t.specialTransport}
                </a>
              </li>
            </ul>
          )}
        </li>
        <li className="relative">
          <button onClick={() => handleDropdown("detailed")} className="hover:underline">{t.detailedInfo}</button>
          {openDropdown === "detailed" && (
            <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg z-50 max-h-96 overflow-y-auto">
              <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">{t.cameras}</a></li>
              <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">{t.trafficIncidents}</a></li>
              <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">{t.roadworks}</a></li>
              <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">{t.travelTimes}</a></li>
              <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">{t.restAreas}</a></li>
              <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">{t.counters}</a></li>
              <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">{t.boraWind}</a></li>
              <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">{t.eVignettes}</a></li>
              <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">{t.mapLink}</a></li>
              <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">{t.transalpina}</a></li>
            </ul>
          )}
        </li>
        <li>
          <a className="hover:underline" href="#">
            {t.news}
          </a>
        </li>
        <li className="relative">
          <button onClick={() => handleDropdown("lang")} className="hover:underline">{t.selectLanguage}</button>
          {openDropdown === "lang" && (
            <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg z-50">
              <li>
                <button
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  onClick={() => { setLang("en"); setOpenDropdown(null); }}
                >
                  English
                </button>
              </li>
              <li>
                <button
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  onClick={() => { setLang("ro"); setOpenDropdown(null); }}
                >
                  Română
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;