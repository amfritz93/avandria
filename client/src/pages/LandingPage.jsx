import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';
import ThemeToggle from '../components/common/ThemeToggle';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Redirect to dashboard if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const openLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h1
            className="text-6xl md:text-8xl font-bold tracking-wider mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            AVANDRIA
          </h1>
          <p
            className="text-xl md:text-2xl italic"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            A World Awaits the Brave
          </p>
        </div>

        {/* Description */}
        <div
          className="max-w-2xl text-center mb-12 px-4"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <p className="text-lg">
            Embark on a text-based adventure through a world of magic and mystery.
            Choose your species, embrace your calling, and forge your legend.
          </p>
        </div>

        {/* Auth Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={openLogin}
            className="px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg-primary)'
            }}
          >
            Login
          </button>
          <button
            onClick={openRegister}
            className="px-8 py-3 text-lg font-semibold rounded-lg border-2 transition-all duration-200 hover:scale-105"
            style={{
              borderColor: 'var(--color-accent)',
              color: 'var(--color-accent)',
              backgroundColor: 'transparent'
            }}
          >
            Register
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-4 text-center text-sm"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <div className="flex justify-center gap-6 mb-2">
          <button className="hover:underline">About</button>
          <button className="hover:underline">How to Play</button>
          <button className="hover:underline">Credits</button>
        </div>
        <p>Version 1.0.0</p>
      </footer>

      {/* Modals */}
      {showLogin && (
        <LoginModal
          onClose={closeModals}
          onSwitchToRegister={openRegister}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={closeModals}
          onSwitchToLogin={openLogin}
        />
      )}
    </div>
  );
};

export default LandingPage;
