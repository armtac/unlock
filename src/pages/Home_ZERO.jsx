import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useStore from '../store/useStore';
import consultantsData from '../data/consultants.json';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [profile, setProfile] = useState('');
  const [urgency, setUrgency] = useState(null);
  const [examplePlaceholder, setExamplePlaceholder] = useState('');
  const [selectedCompetency, setSelectedCompetency] = useState(null);
  
  const setCurrentQuery = useStore((state) => state.setCurrentQuery);
  const setCurrentCategory = useStore((state) => state.setCurrentCategory);
  const setCurrentUrgency = useStore((state) => state.setCurrentUrgency);
  const setUserLanguage = useStore((state) => state.setUserLanguage);
  const setUserProfile = useStore((state) => state.setUserProfile);

  const urgencies = ['Ora', 'Oggi', 'Questa settimana'];
  
  const center = [41.9028, 12.4964];

  const categories = [
    'Procurement',
    'HR',
    'Finance',
    'Sales',
    'Leadership',
    'Manufacturing',
    'Finance IT & Transformation'
  ];

  const responseExamples = [
    'Ho già provato a negoziare ma non ho ottenuto risultati',
    'Ho parlato con il mio team ma non siamo allineati',
    'Ho analizzato i dati ma non riesco a trovare una soluzione',
    'Ho fatto ricerche online ma le informazioni sono troppo generiche',
    'Ho chiesto consiglio ai colleghi ma ognuno dice una cosa diversa',
    'Ho provato diverse strategie ma nessuna ha funzionato',
    'Ho letto articoli sul tema ma non so come applicarli al mio caso',
    'Ho partecipato a un corso ma ho ancora dubbi pratici',
    'Ho consultato un esperto ma vorrei un secondo parere',
    'Ho fatto un piano ma non sono sicuro sia quello giusto'
  ];

  useEffect(() => {
    const randomExample = responseExamples[Math.floor(Math.random() * responseExamples.length)];
    setExamplePlaceholder(randomExample);
  }, []);

  // Competency data for radar chart
  const competencyData = [
    { competency: 'Leadership', value: 85 },
    { competency: 'Finance', value: 70 },
    { competency: 'HR', value: 65 },
    { competency: 'Sales', value: 75 },
    { competency: 'Procurement', value: 60 },
    { competency: 'Manufacturing', value: 55 },
  ];

  // Filter consultants by selected competency
  const filteredConsultants = selectedCompetency
    ? consultantsData.filter(c => c.expertise && c.expertise.toLowerCase().includes(selectedCompetency.toLowerCase()))
    : consultantsData;

  // Handle radar chart click
  const handleRadarClick = (data) => {
    if (data && data.activePayload && data.activePayload[0]) {
      const clickedCompetency = data.activePayload[0].payload.competency;
      setSelectedCompetency(selectedCompetency === clickedCompetency ? null : clickedCompetency);
    }
  };

  const handleUnlock = () => {
    if (query.trim() && category && language && profile) {
      setCurrentQuery(query);
      setCurrentCategory(category);
      setCurrentUrgency(urgency || 'Ora');
      setUserLanguage(language);
      setUserProfile(profile);
      navigate('/intake');
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="px-4 py-2 md:px-6 md:py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="hover:opacity-80 transition-opacity"
          >
            <img 
              src="/images/logo_unlock.png" 
              alt="UNLOCK" 
              className="h-6 md:h-8"
            />
          </button>
          <div className="flex gap-1 md:gap-2">
            <button
              onClick={() => navigate('/consultants')}
              className="p-2 bg-gray-700 border border-gray-600 rounded-full hover:bg-gray-600 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/my-unlocks')}
              className="p-2 bg-gray-700 border border-gray-600 rounded-full hover:bg-gray-600 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/plans')}
              className="p-2 bg-gray-700 border border-gray-600 rounded-full hover:bg-gray-600 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left side - Forms + Radar (desktop only) */}
          <div className="w-full md:w-1/2 flex flex-col md:border-r border-gray-700">
          {/* Forms section */}
          <div className="flex-1 flex flex-col justify-center p-6 md:p-12">
            <div className="max-w-xl mx-auto w-full">
        
        <h2 className="text-lg md:text-xl font-bold text-gray-100 mb-3 md:mb-4">
          Cosa vuoi sbloccare?
        </h2>
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`w-full p-3 md:p-4 bg-gray-900 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-primary-500 mb-3 md:mb-4 text-sm md:text-base ${category ? 'text-gray-100' : 'text-gray-500'}`}
        >
          <option value="" disabled className="text-gray-500">Seleziona un ambito...</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={examplePlaceholder}
          className="w-full p-3 md:p-4 bg-gray-900 border-2 border-gray-600 text-gray-100 placeholder-gray-500 rounded-xl resize-none focus:outline-none focus:border-primary-500 mb-4 text-sm md:text-base"
          rows={3}
        />
        
        {/* Language and Profile Selection - Minimal Design */}
        <div className="flex gap-3 mb-4 md:mb-6">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`flex-1 p-2 md:p-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 text-xs md:text-sm ${language ? 'text-gray-100' : 'text-gray-500'}`}
          >
            <option value="" disabled className="text-gray-500">Lingua</option>
            <option value="it">Italiano</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
          
          <select
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className={`flex-1 p-2 md:p-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 text-xs md:text-sm ${profile ? 'text-gray-100' : 'text-gray-500'}`}
          >
            <option value="" disabled className="text-gray-500">Profilo Utente</option>
            <option value="entrepreneur">Imprenditore</option>
            <option value="manager">Manager</option>
            <option value="employee">Dipendente</option>
            <option value="consultant">Consulente</option>
            <option value="student">Studente</option>
          </select>
        </div>
        
        <div className="mb-6" style={{ display: 'none' }}>
          <p className="text-sm text-gray-400 mb-2">Urgenza</p>
          <div className="flex gap-2">
            {urgencies.map((urg) => (
              <button
                key={urg}
                onClick={() => setUrgency(urg)}
                className={`chip flex-1 ${
                  urgency === urg ? 'chip-selected' : 'chip-unselected'
                }`}
              >
                {urg}
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={handleUnlock}
          disabled={!query.trim() || !category || !language || !profile}
          className="w-full py-3 md:py-4 bg-primary-600 hover:bg-primary-700 text-white text-base md:text-lg font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Unlock now
        </button>
            </div>
          </div>

          {/* Competency Radar - Desktop: below form on left side */}
          <div className="hidden md:block h-80 bg-gray-900 px-6 md:px-12 py-4">
            <div className="max-w-xl mx-auto w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={competencyData} onClick={handleRadarClick} style={{ cursor: 'pointer' }}>
                <PolarGrid stroke="#4B5563" />
                <PolarAngleAxis 
                  dataKey="competency" 
                  tick={{ fill: '#9CA3AF', fontSize: 10 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: '#9CA3AF', fontSize: 10 }}
                />
                <Radar 
                  name="Competenze" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.6} 
                />
              </RadarChart>
            </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right side - Geographic Map (desktop full height) */}
        <div className="hidden md:block md:w-1/2 relative order-2">
            <MapContainer 
              center={center} 
              zoom={6} 
              className="h-full w-full"
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {filteredConsultants.slice(0, 10).map((consultant) => (
                <Marker key={consultant.id} position={[consultant.lat, consultant.lng]}>
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold">{consultant.name}</p>
                      <p className="text-gray-600">{consultant.role}</p>
                      <p className="text-yellow-600">★ {consultant.rating}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

        {/* Competency Radar - Mobile only (middle position) */}
        <div className="block md:hidden h-64 bg-gray-900 p-6 order-2">
          <div className="max-w-xl mx-auto w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={competencyData} onClick={handleRadarClick} style={{ cursor: 'pointer' }}>
              <PolarGrid stroke="#4B5563" />
              <PolarAngleAxis 
                dataKey="competency" 
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
              />
              <Radar 
                name="Competenze" 
                dataKey="value" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.6} 
              />
            </RadarChart>
          </ResponsiveContainer>
          </div>
        </div>

        {/* Geographic Map - Mobile only (at bottom) */}
        <div className="block md:hidden relative h-64 order-3">
          <MapContainer 
            center={center} 
            zoom={6} 
            className="h-full w-full"
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {filteredConsultants.slice(0, 10).map((consultant) => (
              <Marker key={consultant.id} position={[consultant.lat, consultant.lng]}>
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold">{consultant.name}</p>
                    <p className="text-gray-600">{consultant.role}</p>
                    <p className="text-yellow-600">★ {consultant.rating}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        </div>

        {/* Footer Banner */}
        <div className="bg-gray-800 border-t border-gray-700 py-3 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <p>© 2026 Unlock. All rights reserved.</p>
            <a 
              href="/become-consultant" 
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Diventa consulente →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
