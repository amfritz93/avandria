import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { fetchHero, selectActiveHero, selectActiveHeroLoading } from '../store/heroSlice';
import {
  fetchLocation,
  selectCurrentLocation,
  selectLocationLoading,
  selectConnections,
  selectMonsters,
  selectHeroContext
} from '../store/navigationSlice';
import ThemeToggle from '../components/common/ThemeToggle';
import LocationPanel from '../components/gameBoard/LocationPanel';
import HeroStatsBar from '../components/gameBoard/HeroStatsBar';
import NavigationTab from '../components/gameBoard/NavigationTab';
import CombatTab from '../components/gameBoard/CombatTab';
import MapTab from '../components/gameBoard/MapTab';

/**
 * GameBoard - Main gameplay screen
 *
 * Displays:
 * - Hero status bar (HP, MP, Stamina, Level)
 * - Current location with flavor text
 * - Tab-based Hero Controls (Navigation, Combat, Map)
 */
const GameBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { heroId } = useParams();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Hero state
  const activeHero = useSelector(selectActiveHero);
  const heroLoading = useSelector(selectActiveHeroLoading);

  // Navigation state
  const currentLocation = useSelector(selectCurrentLocation);
  const locationLoading = useSelector(selectLocationLoading);
  const connections = useSelector(selectConnections);
  const monsters = useSelector(selectMonsters);
  const heroContext = useSelector(selectHeroContext);

  // Active tab state
  const [activeTab, setActiveTab] = useState('navigation');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Fetch hero on mount
  useEffect(() => {
    if (heroId) {
      dispatch(fetchHero(heroId));
    }
  }, [dispatch, heroId]);

  // Fetch location when hero loads or location changes
  useEffect(() => {
    if (activeHero?.hero?.navigation?.currentSite) {
      dispatch(fetchLocation({
        locationId: activeHero.hero.navigation.currentSite,
        heroId: activeHero.hero.id
      }));
    }
  }, [dispatch, activeHero?.hero?.navigation?.currentSite, activeHero?.hero?.id]);

  // Handle back to dashboard
  const handleBack = () => {
    navigate('/dashboard');
  };

  // Loading state
  if (heroLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p style={{ color: 'var(--color-text-secondary)' }}>Loading hero...</p>
        </div>
      </div>
    );
  }

  // Error state - hero not found
  if (!heroLoading && !activeHero) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
      >
        <div className="text-center">
          <p className="text-xl mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Hero not found
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'white'
            }}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const hero = activeHero?.hero;
  const speciesInfo = activeHero?.speciesInfo;
  const callingInfo = activeHero?.callingInfo;

  // Determine which tabs are available based on game state
  const showCombatTab = monsters && !heroContext?.isCleared;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Header */}
      <header
        className="py-3 px-4 flex justify-between items-center border-b shrink-0"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)'
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-lg transition-colors hover:bg-opacity-80"
            style={{ color: 'var(--color-text-secondary)' }}
            title="Return to Dashboard"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold" style={{ color: 'var(--color-accent)' }}>
              {hero?.heroName}
            </h1>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Level {hero?.level} {speciesInfo?.name} {callingInfo?.name}
            </p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {/* Hero Stats Bar */}
      <HeroStatsBar hero={hero} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Location Panel */}
        <LocationPanel
          location={currentLocation}
          loading={locationLoading}
          heroContext={heroContext}
        />

        {/* Hero Controls Tabs */}
        <div
          className="flex-1 flex flex-col border-t"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border)'
          }}
        >
          {/* Tab Headers */}
          <div
            className="flex border-b"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <TabButton
              label="Navigation"
              isActive={activeTab === 'navigation'}
              onClick={() => setActiveTab('navigation')}
            />
            {showCombatTab && (
              <TabButton
                label="Combat"
                isActive={activeTab === 'combat'}
                onClick={() => setActiveTab('combat')}
                highlight
              />
            )}
            <TabButton
              label="Map"
              isActive={activeTab === 'map'}
              onClick={() => setActiveTab('map')}
            />
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto p-4">
            {activeTab === 'navigation' && (
              <NavigationTab
                connections={connections}
                heroId={hero?.id}
                canProgress={heroContext?.canProgress}
                monsters={monsters}
              />
            )}
            {activeTab === 'combat' && showCombatTab && (
              <CombatTab
                monsters={monsters}
                hero={hero}
                location={currentLocation}
              />
            )}
            {activeTab === 'map' && (
              <MapTab heroId={hero?.id} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

/**
 * Tab Button Component
 */
const TabButton = ({ label, isActive, onClick, highlight = false }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 font-medium transition-colors relative ${
      isActive ? 'border-b-2' : ''
    }`}
    style={{
      color: isActive
        ? 'var(--color-accent)'
        : highlight
          ? 'var(--color-warning)'
          : 'var(--color-text-secondary)',
      borderColor: isActive ? 'var(--color-accent)' : 'transparent',
      backgroundColor: isActive ? 'var(--color-bg-tertiary)' : 'transparent'
    }}
  >
    {label}
    {highlight && !isActive && (
      <span
        className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse"
        style={{ backgroundColor: 'var(--color-warning)' }}
      />
    )}
  </button>
);

export default GameBoard;
