import './App.css'
import MapView from './components/MapView';
import Navbar from './components/Navbar';
import SidebarCities from './components/SidebarCities';
import { LanguageProvider } from './utils/LanguageContext';
import { useState } from 'react';

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <LanguageProvider>
        <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 overflow-hidden">
          <div className="w-full md:w-64 flex-shrink-0">
            <SidebarCities onSelectCity={setSelectedCity} selectedCity={selectedCity} />
          </div>
          <main className="flex-1 bg-white">
            <MapView selectedCity={selectedCity} />
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App