import { createContext, useContext, useState } from "react";

const translations = {
  en: {
    navbarTitle: "Traffic Info",
    trafficForecast: "Traffic Forecast",
    trafficCalendar: "Traffic Calendar",
    freightTraffic: "Freight Traffic",
    generalLimitations: "General Limitations",
    specialTransport: "Special Transport",
    detailedInfo: "Detailed Info",
    cameras: "Cameras",
    trafficIncidents: "Traffic Incidents",
    roadworks: "Roadworks",
    travelTimes: "Travel Times",
    restAreas: "Rest Areas",
    counters: "Counters",
    boraWind: "Bora Wind",
    eVignettes: "E-Vignettes",
    mapLink: "Map",
    transalpina: "Road to Transalpina",
    news: "News",
    selectLanguage: "Select Language",
  },
  ro: {
    navbarTitle: "Informații Trafic",
    trafficForecast: "Prognoza Traficului",
    trafficCalendar: "Calendar Trafic",
    freightTraffic: "Traficul de Marfă",
    generalLimitations: "Restricții Generale",
    specialTransport: "Transport Special",
    detailedInfo: "Informații Detaliate",
    cameras: "Camere",
    trafficIncidents: "Incidente Rutiere",
    roadworks: "Lucrări Drum",
    travelTimes: "Timpuri de Călătorie",
    restAreas: "Zone de Odihnă",
    counters: "Numărătoare",
    boraWind: "Vântul Bora",
    eVignettes: "E-Vignete",
    mapLink: "Hartă",
    transalpina: "Drumul către Transalpina",
    news: "Știri",
    selectLanguage: "Selectați limba",
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ro");
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}