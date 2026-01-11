import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { classifyQuery } from '../utils/matching';

const Intake = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const currentSession = useStore((state) => state.currentSession);
  const userLanguage = useStore((state) => state.user.language);
  const setCurrentCategory = useStore((state) => state.setCurrentCategory);
  const setUserLanguage = useStore((state) => state.setUserLanguage);
  const [selectedLanguage, setSelectedLanguage] = useState(userLanguage);
  const [showLanguageSelect, setShowLanguageSelect] = useState(!userLanguage);

  const languages = ['IT', 'EN', 'ES'];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100 && !showLanguageSelect) {
      const category = classifyQuery(currentSession.query);
      setCurrentCategory(category);
      setTimeout(() => {
        navigate('/matching');
      }, 500);
    }
  }, [progress, showLanguageSelect, currentSession.query, setCurrentCategory, navigate]);

  const handleLanguageConfirm = () => {
    if (selectedLanguage) {
      setUserLanguage(selectedLanguage);
      setShowLanguageSelect(false);
    }
  };

  if (showLanguageSelect) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Lingua preferita
            </h2>
            <p className="text-gray-600">
              In che lingua preferisci la call?
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`chip ${
                  selectedLanguage === lang ? 'chip-selected' : 'chip-unselected'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={handleLanguageConfirm}
            disabled={!selectedLanguage}
            className="btn-primary"
          >
            Conferma
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
            <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Stiamo analizzando il tuo bisogno...
          </h2>
          <p className="text-gray-600 mb-8">
            Identificazione della categoria e del consulente ideale
          </p>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-primary-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">{progress}%</p>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-sm text-gray-700 italic">
            "{currentSession.query}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intake;
