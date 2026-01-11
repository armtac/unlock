import { useParams, useNavigate } from 'react-router-dom';
import consultantsData from '../data/consultants.json';

const ConsultantProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const consultant = consultantsData.find(c => c.id === id);

  if (!consultant) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Consulente non trovato</h2>
          <button onClick={() => navigate('/home')} className="btn-primary max-w-xs mx-auto">
            Torna alla home
          </button>
        </div>
      </div>
    );
  }

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
            <path d="M14 2v6h6M9 13h6M9 17h6M9 9h1" />
          </svg>
        );
      case 'Excel':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
            <path d="M14 2v6h6M10 9l4 6m0-6l-4 6" />
          </svg>
        );
      case 'Word':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
            <path d="M14 2v6h6M9 9h6M9 13h6M9 17h3" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-4xl mx-auto p-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-32 h-32 bg-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
              {consultant.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-100 mb-2">{consultant.name}</h1>
              <p className="text-xl text-primary-400 mb-3">{consultant.role}</p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-gray-300 font-semibold">{consultant.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">{consultant.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span className="text-gray-300">{consultant.languages.join(', ')}</span>
                </div>
                {consultant.location && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-300">{consultant.location}</span>
                  </div>
                )}
              </div>

              {consultant.linkedin && (
                <a
                  href={consultant.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  Collegati su LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Bio */}
        {consultant.bio && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-gray-100 mb-3">Chi sono</h2>
            <p className="text-gray-300 leading-relaxed">{consultant.bio}</p>
          </div>
        )}

        {/* Experience */}
        {consultant.experience && consultant.experience.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-gray-100 mb-4">Esperienza</h2>
            <div className="space-y-3">
              {consultant.experience.map((exp, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">{exp}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {consultant.education && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-gray-100 mb-3">Formazione</h2>
            <p className="text-gray-300">{consultant.education}</p>
          </div>
        )}

        {/* Expertise Areas */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-gray-100 mb-4">Aree di competenza</h2>
          <div className="flex flex-wrap gap-2">
            {consultant.categories.map((category, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
          <p className="text-gray-400 mt-4 text-sm">{consultant.expertise}</p>
        </div>

        {/* Attachments */}
        {consultant.attachments && consultant.attachments.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-gray-100 mb-4">Risorse disponibili</h2>
            <div className="space-y-4">
              {consultant.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-primary-500 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-primary-400 flex-shrink-0">
                      {getFileIcon(attachment.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-semibold text-gray-100">{attachment.title}</h3>
                        {attachment.isFree ? (
                          <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full flex-shrink-0">
                            GRATIS
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full flex-shrink-0">
                            {attachment.price}€
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3">{attachment.description}</p>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 uppercase">{attachment.type}</span>
                        <button className="text-sm text-primary-400 hover:text-primary-300 font-semibold">
                          {attachment.isFree ? 'Scarica gratis →' : 'Acquista →'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Hai un dubbio?</h3>
          <p className="text-primary-100 mb-4">
            Prenota una call di 20 minuti con {consultant.name.split(' ')[0]} per sbloccare il tuo prossimo passo
          </p>
          <button
            onClick={() => navigate('/home')}
            className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Prenota una call
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfile;
