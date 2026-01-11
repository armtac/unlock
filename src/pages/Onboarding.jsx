import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  
  const setUserLanguage = useStore((state) => state.setUserLanguage);
  const setUserProfile = useStore((state) => state.setUserProfile);

  const languages = ['IT', 'EN', 'ES'];
  const profiles = ['Manager', 'Founder', 'Startup', 'Altro'];

  const handleNext = () => {
    if (step === 1 && selectedLanguage) {
      setUserLanguage(selectedLanguage);
      setStep(2);
    } else if (step === 2 && selectedProfile) {
      setUserProfile(selectedProfile);
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-400 mb-2">UNLOCK</h1>
          <p className="text-gray-400">Sblocca il tuo prossimo passo</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className={`text-sm font-medium ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                Step 1
              </span>
              <span className={`text-sm font-medium ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                Step 2
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 2) * 100}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">
                Lingua preferita per le call
              </h2>
              <p className="text-gray-400 mb-6">
                Seleziona la lingua in cui preferisci comunicare
              </p>
              <div className="flex flex-wrap gap-3">
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
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">
                Il tuo profilo
              </h2>
              <p className="text-gray-400 mb-6">
                Come ti descriveresti meglio?
              </p>
              <div className="flex flex-wrap gap-3">
                {profiles.map((profile) => (
                  <button
                    key={profile}
                    onClick={() => setSelectedProfile(profile)}
                    className={`chip ${
                      selectedProfile === profile ? 'chip-selected' : 'chip-unselected'
                    }`}
                  >
                    {profile}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleNext}
            disabled={step === 1 ? !selectedLanguage : !selectedProfile}
            className="btn-primary mt-8"
          >
            {step === 1 ? 'Continua' : 'Inizia'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
