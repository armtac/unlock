import { useNavigate } from 'react-router-dom';

const BecomeConsultant = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header with back button */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Torna alla Home</span>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Diventa Consulente Unlock
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Unisciti alla nostra rete di esperti e aiuta professionisti a sbloccare il loro potenziale.
          </p>
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Pagina in costruzione
            </h2>
            <p className="text-gray-400 mb-6">
              Questa sezione è attualmente in fase di sviluppo. Torna presto per scoprire come diventare parte del team Unlock!
            </p>
            <button
              onClick={() => navigate('/home')}
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors"
            >
              Torna alla Home
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
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
  );
};

export default BecomeConsultant;
