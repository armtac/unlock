import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { generateRoomName } from '../utils/matching';

const Call = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [notes, setNotes] = useState('');
  const [showInvite, setShowInvite] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [roomName] = useState(generateRoomName());
  const timerRef = useRef(null);
  
  const currentSession = useStore((state) => state.currentSession);
  const startSession = useStore((state) => state.startSession);
  const setSessionNotes = useStore((state) => state.setSessionNotes);

  const jitsiUrl = `https://meet.jit.si/${roomName}`;
  const consultantName = currentSession.consultant?.name || 'Consulente';

  useEffect(() => {
    startSession();
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleEndCall();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setSessionNotes(notes);
  }, [notes, setSessionNotes]);

  const handleEndCall = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    navigate('/summary');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const inviteText = `Ciao ${consultantName}, puoi entrare ora nella call UNLOCK? Link: ${jitsiUrl}`;

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(inviteText);
    alert('Link copiato!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'UNLOCK Call',
          text: inviteText,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopyInvite();
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-900 flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between text-white">
          <div>
            <p className="text-sm opacity-80">Call con {consultantName}</p>
            <p className="text-xs opacity-60">{currentSession.category}</p>
          </div>
          <div className="bg-red-600 px-4 py-2 rounded-full font-bold text-lg">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        {showBanner && (
          <div className="absolute top-16 left-4 right-4 z-30 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 shadow-lg">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Prototipo - Limitazione Jitsi</p>
                <p className="text-xs text-gray-700">
                  Meet.jit.si embed è solo per demo e disconnette dopo 5 min. Per produzione usa Jitsi as a Service o self-hosted.
                </p>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0 p-1 hover:bg-yellow-200 rounded-full transition-colors"
                aria-label="Chiudi banner"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        <iframe
          src={jitsiUrl}
          allow="camera; microphone; fullscreen; display-capture"
          className="w-full h-full border-0"
          title="Jitsi Meeting"
        />
      </div>

      <div className="bg-white p-4 space-y-4">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full ${isMuted ? 'bg-red-600' : 'bg-gray-200'}`}
          >
            <svg className={`w-6 h-6 ${isMuted ? 'text-white' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMuted ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              )}
            </svg>
          </button>

          <button
            onClick={handleEndCall}
            className="p-6 rounded-full bg-red-600 hover:bg-red-700"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`p-4 rounded-full ${isSpeaker ? 'bg-primary-600' : 'bg-gray-200'}`}
          >
            <svg className={`w-6 h-6 ${isSpeaker ? 'text-white' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">Note della call</label>
            <button
              onClick={() => setShowInvite(!showInvite)}
              className="text-sm text-primary-600 font-semibold"
            >
              {showInvite ? 'Nascondi invite' : 'Invita consulente'}
            </button>
          </div>

          {showInvite && (
            <div className="mb-3 p-3 bg-primary-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Condividi questo link con il consulente:</p>
              <p className="text-xs bg-white p-2 rounded mb-2 break-all">{inviteText}</p>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyInvite}
                  className="flex-1 bg-primary-600 text-white text-sm py-2 px-3 rounded-lg hover:bg-primary-700"
                >
                  Copia link
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 bg-white text-primary-600 border-2 border-primary-600 text-sm py-2 px-3 rounded-lg hover:bg-primary-50"
                >
                  Condividi
                </button>
              </div>
            </div>
          )}

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Scrivi qui i tuoi appunti durante la call..."
            className="w-full p-3 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-primary-500 text-sm"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default Call;
