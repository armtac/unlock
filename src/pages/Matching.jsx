import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useStore from '../store/useStore';
import { findThreeConsultants, generateThreeETAs } from '../utils/matching';

const Matching = () => {
  const navigate = useNavigate();
  const [searching, setSearching] = useState(true);
  const [consultants, setConsultants] = useState([]);
  const [etas, setEtas] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  
  const currentSession = useStore((state) => state.currentSession);
  const userLanguage = useStore((state) => state.user.language);
  const setCurrentConsultant = useStore((state) => state.setCurrentConsultant);

  useEffect(() => {
    const searchDuration = Math.floor(Math.random() * 3000) + 2000;
    
    const timer = setTimeout(() => {
      const matchedConsultants = findThreeConsultants(
        userLanguage,
        currentSession.category
      );
      const estimatedEtas = generateThreeETAs();
      
      setConsultants(matchedConsultants);
      setEtas(estimatedEtas);
      setSearching(false);
    }, searchDuration);

    return () => clearTimeout(timer);
  }, [currentSession.category, userLanguage]);

  const handleSelectConsultant = (consultant) => {
    setCurrentConsultant(consultant);
    navigate('/call');
  };

  const handleNameClick = (consultant) => {
    setSelectedConsultant(consultant);
    setShowProfileModal(true);
  };

  const center = [41.9028, 12.4964];

  return (
    <div className="h-screen w-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/home')}
            className="p-2 bg-gray-700 border border-gray-600 rounded-full hover:bg-gray-600 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-primary-400 ml-4">
            {searching ? 'Searching...' : 'Match trovato!'}
          </h1>
        </div>
      </div>

      {searching ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-2">
              Ricerca in corso...
            </h2>
            <p className="text-gray-400 mb-4">
              Categoria: <span className="font-semibold text-primary-400">{currentSession.category}</span>
            </p>
            <p className="text-sm text-gray-500">
              Stiamo trovando i migliori consulenti per te
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Left side - Consultants List */}
          <div className="w-1/2 overflow-y-auto p-6 border-r border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">
              Scegli il tuo consulente
            </h2>
            
            <div className="space-y-4">
              {consultants.map((consultant, index) => (
                <div key={consultant.id} className="bg-gray-800 rounded-2xl border-2 border-gray-700 hover:border-primary-500 p-4 transition-colors">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                      {consultant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 
                          className="text-lg font-bold text-white cursor-pointer hover:text-primary-400 transition-colors"
                          onClick={() => handleNameClick(consultant)}
                        >
                          {consultant.name}
                        </h3>
                        <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">
                          {consultant.displayLevel}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mb-1">{consultant.role}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-semibold text-gray-100">{consultant.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-xs text-gray-300">{consultant.location}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs font-semibold text-primary-400">ETA: {etas[index]} min</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleSelectConsultant(consultant)}
                    className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors"
                  >
                    Start 20-min call
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Map */}
          <div className="w-1/2 relative">
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
              
              {consultants.map((consultant) => (
                <Marker key={consultant.id} position={[consultant.lat, consultant.lng]}>
                  <Popup>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{consultant.name}</p>
                      <p className="text-xs text-gray-600">{consultant.location}</p>
                      <p className="text-xs text-gray-500 mt-1">{consultant.displayLevel}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}

      {/* Consultant Profile Modal */}
      {showProfileModal && selectedConsultant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowProfileModal(false)}>
          <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {selectedConsultant.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{selectedConsultant.name}</h2>
                <p className="text-gray-300">{selectedConsultant.role}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-semibold text-gray-100">{selectedConsultant.rating}</span>
                  <span className="text-sm text-gray-400">• {selectedConsultant.displayLevel}</span>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {selectedConsultant.bio && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-2">Chi sono</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedConsultant.bio}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Competenze</h3>
                <p className="text-gray-300 text-sm">{selectedConsultant.expertise}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Lingue</h3>
                <p className="text-gray-300 text-sm">{selectedConsultant.languages.join(', ')}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Location</h3>
                <p className="text-gray-300 text-sm">{selectedConsultant.location}</p>
              </div>
            </div>

            {selectedConsultant.experience && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-2">Esperienza</h3>
                <ul className="space-y-2">
                  {selectedConsultant.experience.map((exp, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedConsultant.education && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-2">Formazione</h3>
                <p className="text-gray-300 text-sm">{selectedConsultant.education}</p>
              </div>
            )}

            {selectedConsultant.linkedin && (
              <a
                href={selectedConsultant.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Vedi profilo LinkedIn
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Matching;
