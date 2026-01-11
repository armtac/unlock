import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { generateNextSteps } from '../utils/matching';

const Summary = () => {
  const navigate = useNavigate();
  const currentSession = useStore((state) => state.currentSession);
  const setNextSteps = useStore((state) => state.setNextSteps);
  const saveSession = useStore((state) => state.saveSession);

  useEffect(() => {
    const steps = generateNextSteps(currentSession.category);
    setNextSteps(steps);
  }, [currentSession.category, setNextSteps]);

  const handleSave = () => {
    saveSession();
    navigate('/my-unlocks');
  };

  const handleRate = () => {
    navigate('/rate');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Next step unlocked!
          </h1>
          <p className="text-gray-600">
            Ecco i prossimi passi concreti per te
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
              {currentSession.consultant?.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{currentSession.consultant?.name}</p>
              <p className="text-sm text-gray-600">{currentSession.consultant?.role}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Categoria</p>
            <p className="font-semibold text-primary-600">{currentSession.category}</p>
          </div>

          {currentSession.notes && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Le tue note</p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{currentSession.notes}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            I tuoi prossimi 3 passi
          </h2>
          <div className="space-y-4">
            {currentSession.nextSteps.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSave}
            className="btn-primary"
          >
            Salva in My Unlocks
          </button>
          <button
            onClick={handleRate}
            className="btn-secondary"
          >
            Valuta il consulente
          </button>
          <button
            onClick={() => navigate('/home')}
            className="w-full text-primary-600 font-semibold py-4 hover:underline"
          >
            Nuovo unlock
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
