import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import consultantsData from '../data/consultants.json';

const Consultants = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Map Section */}
      <div className="h-96 w-full relative">
        <MapContainer 
          center={[45.4642, 9.1900]} 
          zoom={5} 
          className="h-full w-full"
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {consultantsData.map((consultant) => (
            <Marker 
              key={consultant.id} 
              position={[consultant.lat, consultant.lng]}
            >
              <Popup>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{consultant.name}</p>
                  <p className="text-xs text-gray-600">{consultant.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{consultant.location}</p>
                  <button
                    onClick={() => navigate(`/consultant/${consultant.id}`)}
                    className="mt-2 text-xs text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Vedi profilo →
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-100">I nostri consulenti</h1>
          <button
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultantsData.map((consultant) => (
            <div
              key={consultant.id}
              onClick={() => navigate(`/consultant/${consultant.id}`)}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-primary-500 cursor-pointer transition-all hover:shadow-lg hover:shadow-primary-500/20"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {consultant.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-100 mb-1 truncate">{consultant.name}</h3>
                  <p className="text-sm text-primary-400 mb-2">{consultant.role}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-sm font-semibold text-gray-300">{consultant.rating}</span>
                    <span className="text-sm text-gray-500">• {consultant.level}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{consultant.expertise}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {consultant.categories.slice(0, 2).map((category, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                  >
                    {category}
                  </span>
                ))}
                {consultant.categories.length > 2 && (
                  <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">
                    +{consultant.categories.length - 2}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span>{consultant.languages.join(', ')}</span>
                </div>
                {consultant.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{consultant.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Consultants;
