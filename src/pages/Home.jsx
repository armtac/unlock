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
  const [showRadar, setShowRadar] = useState(false);
  const [mobileRadarOpen, setMobileRadarOpen] = useState(false);
  const [showShimmer, setShowShimmer] = useState(true);
  
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

  // Toggle radar visibility
  useEffect(() => {
    if (category) {
      setTimeout(() => setShowRadar(true), 300);
    }
  }, [category]);

  // Shimmer effect on consultants button
  useEffect(() => {
    const timer = setTimeout(() => setShowShimmer(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-gray-900 to-purple-900 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 py-3 md:px-6 md:py-4 bg-gray-900 bg-opacity-80 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="hover:opacity-80 transition-opacity"
          >
            <img 
              src="/images/logo_unlock.png" 
              alt="UNLOCK" 
              className="h-8 md:h-10"
            />
          </button>
          <div className="flex gap-2">
            <div className="relative group">
              <button
                onClick={() => navigate('/consultants')}
                className={`p-2 bg-gray-800 bg-opacity-50 backdrop-blur-sm border rounded-full hover:bg-gray-700 transition-all relative ${
                  showShimmer ? 'border-primary-400 animate-shimmer' : 'border-gray-700'
                }`}
              >
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-gray-700">
                Consultants Pool
              </div>
            </div>
            <div className="relative group">
              <button
                onClick={() => navigate('/my-unlocks')}
                className="p-2 bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-full hover:bg-gray-700 transition-all"
              >
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-gray-700">
                My Unlocks
              </div>
            </div>
            <div className="relative group">
              <button
                onClick={() => navigate('/plans')}
                className="p-2 bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-full hover:bg-gray-700 transition-all"
              >
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-gray-700">
                Account
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Central Form */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 md:py-20">
        <div className="max-w-4xl w-full">
          {/* Hero Title */}
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-purple-400">
              Sblocca il tuo potenziale
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Consulenze rapide e mirate con esperti del settore
            </p>
          </div>

          {/* Glassmorphism Form */}
          <div className="bg-gray-800 bg-opacity-40 backdrop-blur-xl border border-gray-700 rounded-3xl p-6 md:p-10 shadow-2xl hover:shadow-primary-500/20 transition-all duration-300 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              Cosa vuoi sbloccare?
            </h2>
            
            <div className="space-y-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full p-4 bg-gray-900 bg-opacity-50 backdrop-blur-sm border-2 ${category ? 'border-primary-500' : 'border-gray-600'} text-gray-100 rounded-xl focus:outline-none focus:border-primary-400 transition-all text-base ${category ? 'text-gray-100' : 'text-gray-500'}`}
              >
                <option value="" disabled>Seleziona un ambito...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={examplePlaceholder}
                className="w-full p-4 bg-gray-900 bg-opacity-50 backdrop-blur-sm border-2 border-gray-600 text-gray-100 placeholder-gray-500 rounded-xl resize-none focus:outline-none focus:border-primary-400 transition-all text-base"
                rows={3}
              />
              
              <div className="flex gap-3">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`flex-1 p-3 bg-gray-900 bg-opacity-50 backdrop-blur-sm border ${language ? 'border-primary-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:border-primary-400 transition-all text-sm ${language ? 'text-gray-100' : 'text-gray-500'}`}
                >
                  <option value="" disabled>Lingua</option>
                  <option value="it">Italiano</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
                
                <select
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  className={`flex-1 p-3 bg-gray-900 bg-opacity-50 backdrop-blur-sm border ${profile ? 'border-primary-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:border-primary-400 transition-all text-sm ${profile ? 'text-gray-100' : 'text-gray-500'}`}
                >
                  <option value="" disabled>Profilo Utente</option>
                  <option value="entrepreneur">Imprenditore</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Dipendente</option>
                  <option value="consultant">Consulente</option>
                  <option value="student">Studente</option>
                </select>
              </div>
              
              <button
                onClick={handleUnlock}
                disabled={!query.trim() || !category || !language || !profile}
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg hover:shadow-primary-500/50"
              >
                🔓 Unlock now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Radar Widget - Desktop */}
      {showRadar && category && (
        <div className="fixed bottom-6 right-6 z-20 animate-fade-in hidden md:block">
          <div className="bg-gray-800 bg-opacity-90 backdrop-blur-xl border border-gray-700 rounded-2xl p-4 shadow-2xl w-64 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={competencyData} onClick={handleRadarClick} style={{ cursor: 'pointer' }}>
                <PolarGrid stroke="#4B5563" />
                <PolarAngleAxis 
                  dataKey="competency" 
                  tick={{ fill: '#9CA3AF', fontSize: 9 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: '#9CA3AF', fontSize: 8 }}
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
      )}

      {/* Mobile Radar - Collapsible */}
      {showRadar && category && (
        <>
          {/* Floating Button */}
          <button
            onClick={() => setMobileRadarOpen(!mobileRadarOpen)}
            className="fixed bottom-6 right-6 z-30 md:hidden bg-gradient-to-r from-primary-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all transform hover:scale-110 animate-fade-in"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>

          {/* Collapsible Radar Panel */}
          {mobileRadarOpen && (
            <div className="fixed inset-x-0 bottom-0 z-20 md:hidden animate-slide-up">
              <div className="bg-gray-800 bg-opacity-95 backdrop-blur-xl border-t border-gray-700 rounded-t-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Competenze Disponibili</h3>
                  <button
                    onClick={() => setMobileRadarOpen(false)}
                    className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="h-64">
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
                        tick={{ fill: '#9CA3AF', fontSize: 9 }}
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
                <p className="text-xs text-gray-400 text-center mt-4">
                  Tocca una competenza per filtrare i consulenti
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Map Section */}
      <div className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Esperti disponibili
          </h3>
          <div className="bg-gray-800 bg-opacity-40 backdrop-blur-xl border border-gray-700 rounded-3xl overflow-hidden shadow-2xl" style={{ height: '500px' }}>
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
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-gray-900 bg-opacity-80 backdrop-blur-sm border-t border-gray-700 py-4 px-6">
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

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          50% {
            box-shadow: 0 0 20px 8px rgba(59, 130, 246, 0.4);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
