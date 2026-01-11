import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../store/useStore';

const MyUnlocks = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const sessions = useStore((state) => state.sessions);
  const [selectedSession, setSelectedSession] = useState(
    id ? sessions.find(s => s.id === id) : null
  );

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (start, end) => {
    const duration = Math.floor((end - start) / 1000 / 60);
    return `${duration} min`;
  };

  if (selectedSession) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => {
                setSelectedSession(null);
                navigate('/my-unlocks');
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedSession.consultant?.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedSession.consultant?.name}</p>
                  <p className="text-sm text-gray-600">{selectedSession.consultant?.role}</p>
                </div>
              </div>
              {selectedSession.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="font-semibold">{selectedSession.rating}</span>
                </div>
              )}
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm text-gray-500">Data</p>
                <p className="font-medium">{formatDate(selectedSession.startTime)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Durata</p>
                <p className="font-medium">{formatDuration(selectedSession.startTime, selectedSession.endTime)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Categoria</p>
                <p className="font-medium text-primary-600">{selectedSession.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Domanda iniziale</p>
                <p className="text-gray-700 italic">"{selectedSession.query}"</p>
              </div>
            </div>

            {selectedSession.notes && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Note della call</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedSession.notes}</p>
                </div>
              </div>
            )}

            {selectedSession.tags && selectedSession.tags.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Tag</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSession.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedSession.ratingNotes && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Feedback</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{selectedSession.ratingNotes}</p>
                </div>
              </div>
            )}
          </div>

          {selectedSession.nextSteps && selectedSession.nextSteps.length > 0 && (
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Next steps
              </h2>
              <div className="space-y-3">
                {selectedSession.nextSteps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-sm pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => navigate('/home')}
            className="btn-primary"
          >
            Nuovo unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">My Unlocks</h1>
          <button
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Nessun unlock ancora
            </h2>
            <p className="text-gray-300 mb-6">
              Inizia la tua prima sessione per sbloccare il tuo prossimo passo
            </p>
            <button
              onClick={() => navigate('/home')}
              className="btn-primary max-w-xs mx-auto"
            >
              Start new unlock
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className="bg-gray-800 rounded-xl border-2 border-gray-700 p-4 hover:border-primary-500 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {session.consultant?.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{session.consultant?.name}</p>
                      <p className="text-xs text-gray-400">{formatDate(session.startTime)}</p>
                    </div>
                  </div>
                  {session.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-sm font-semibold text-gray-100">{session.rating}</span>
                    </div>
                  )}
                </div>
                
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                    {session.category}
                  </span>
                </div>
                
                <p className="text-sm text-gray-300 line-clamp-2 mb-2">
                  "{session.query}"
                </p>
                
                {session.nextSteps && session.nextSteps.length > 0 && (
                  <p className="text-xs text-gray-400">
                    {session.nextSteps.length} next steps salvati
                  </p>
                )}
              </div>
            ))}
            
            <button
              onClick={() => navigate('/home')}
              className="btn-secondary"
            >
              Start new unlock
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyUnlocks;
