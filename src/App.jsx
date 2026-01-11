import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/useStore';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Intake from './pages/Intake';
import Matching from './pages/Matching';
import Call from './pages/Call';
import Summary from './pages/Summary';
import Rate from './pages/Rate';
import MyUnlocks from './pages/MyUnlocks';
import Plans from './pages/Plans';
import ConsultantProfile from './pages/ConsultantProfile';
import Consultants from './pages/Consultants';
import BecomeConsultant from './pages/BecomeConsultant';

function App() {
  const user = useStore((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/intake" element={<Intake />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/call" element={<Call />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/rate" element={<Rate />} />
        <Route path="/my-unlocks" element={<MyUnlocks />} />
        <Route path="/my-unlocks/:id" element={<MyUnlocks />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/consultants" element={<Consultants />} />
        <Route path="/consultant/:id" element={<ConsultantProfile />} />
        <Route path="/become-consultant" element={<BecomeConsultant />} />
      </Routes>
    </Router>
  );
}

export default App;
