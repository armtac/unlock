import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Rate = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [ratingNotes, setRatingNotes] = useState('');
  
  const currentSession = useStore((state) => state.currentSession);
  const saveSession = useStore((state) => state.saveSession);

  const tags = [
    'Utile',
    'Troppo generico',
    'Molto pratico',
    'Empatico',
    'Senior vero'
  ];

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (rating > 0) {
      saveSession(rating, selectedTags, ratingNotes);
      navigate('/my-unlocks');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/summary')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Valuta la tua esperienza
          </h1>
          <p className="text-gray-600">
            Il tuo feedback ci aiuta a migliorare
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl border-2 border-gray-700 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
              {currentSession.consultant?.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{currentSession.consultant?.name}</p>
              <p className="text-sm text-gray-600">{currentSession.consultant?.role}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-center text-gray-700 font-semibold mb-4">
              Come è stata la call?
            </p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <svg
                    className={`w-12 h-12 ${
                      star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 font-semibold mb-3">
              Tag rapidi
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`chip ${
                    selectedTags.includes(tag) ? 'chip-selected' : 'chip-unselected'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-gray-700 font-semibold mb-2">
              Note aggiuntive (opzionale)
            </p>
            <textarea
              value={ratingNotes}
              onChange={(e) => setRatingNotes(e.target.value)}
              placeholder="Cosa ti è piaciuto di più? Cosa potrebbe essere migliorato?"
              className="w-full p-3 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-primary-500"
              rows={4}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="btn-primary"
        >
          Invia valutazione
        </button>
      </div>
    </div>
  );
};

export default Rate;
