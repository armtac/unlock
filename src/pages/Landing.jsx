import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Landing = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url(/images/maze.jpg)' }}
      />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className={`text-center transition-all duration-1500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <img 
            src="/images/logo_unlock.png" 
            alt="UNLOCK" 
            className="w-[16.8rem] md:w-[25.2rem] mx-auto mb-4"
          />
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light" style={{ fontFamily: 'Futura, sans-serif' }}>
            Unlock your next step
          </p>
          
          <button
            onClick={() => navigate('/home')}
            className="px-12 py-4 bg-primary-600 hover:bg-primary-700 text-white text-xl font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/50"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
