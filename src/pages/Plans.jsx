import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Plans = () => {
  const navigate = useNavigate();
  const userPlan = useStore((state) => state.user.plan);
  const setUserPlan = useStore((state) => state.setUserPlan);
  const [selectedPlan, setSelectedPlan] = useState(userPlan);

  const plans = [
    {
      id: 'basic',
      name: 'BASIC',
      price: '14,99',
      features: [
        'Call illimitate da 20 minuti',
        'Accesso a tutti i consulenti',
        'Note e next steps salvati',
        'Storico sessioni'
      ],
      rates: {
        juniorMid: { user: '20€', consultant: '12€' },
        senior: { user: '40€', consultant: '24€' }
      }
    },
    {
      id: 'premium',
      name: 'PREMIUM',
      price: '29,99',
      popular: true,
      features: [
        'Tutto di Basic',
        'Tariffe ridotte per call',
        'Priorità nel matching',
        'Supporto prioritario',
        'Analytics avanzati'
      ],
      rates: {
        juniorMid: { user: '16€', consultant: '12€' },
        senior: { user: '32€', consultant: '24€' }
      }
    }
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    setUserPlan(planId);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-white">Piani</h1>
          <div className="w-10" />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Scegli il piano perfetto per te
          </h2>
          <p className="text-gray-400">
            Sblocca il tuo potenziale con consulenze rapide e mirate
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-gray-800 rounded-2xl shadow-lg p-6 relative border ${
                plan.popular ? 'border-2 border-primary-500' : 'border border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Più popolare
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-300 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-primary-400">{plan.price}€</span>
                  <span className="text-gray-400">/mese</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-gray-300 mb-3">Tariffe per call:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Junior/Mid:</span>
                    <div>
                      <span className="font-semibold text-white">{plan.rates.juniorMid.user}</span>
                      <span className="text-gray-500 text-xs ml-1">(payout {plan.rates.juniorMid.consultant})</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Senior:</span>
                    <div>
                      <span className="font-semibold text-white">{plan.rates.senior.user}</span>
                      <span className="text-gray-500 text-xs ml-1">(payout {plan.rates.senior.consultant})</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                  selectedPlan === plan.id
                    ? 'bg-green-600 text-white'
                    : plan.popular
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-900 text-primary-400 border-2 border-primary-500 hover:bg-gray-700'
                }`}
              >
                {selectedPlan === plan.id ? '✓ Piano attivo' : 'Seleziona piano'}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-yellow-200 mb-1">Prototipo - Nessun pagamento reale</p>
              <p className="text-sm text-yellow-100">
                Questa è una demo. La selezione del piano viene salvata solo localmente. 
                Non verrà effettuato alcun addebito.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/home')}
            className="text-primary-400 font-semibold hover:text-primary-300 transition-colors"
          >
            Torna alla home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
