import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CharacterCreation from './pages/CharacterCreation';

function App() {
  const { mode } = useSelector((state) => state.theme);

  // Apply theme on mount and when it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-hero" element={<CharacterCreation />} />
      </Routes>
    </Router>
  );
}

export default App;
