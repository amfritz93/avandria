import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import {
  fetchHeroes,
  deleteHero,
  selectHeroes,
  selectHeroesLoading,
  selectIsDeleting
} from '../store/heroSlice';
import ThemeToggle from '../components/common/ThemeToggle';
import { HeroCard } from '../components/dashboard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, account } = useSelector((state) => state.auth);

  // Hero state from Redux
  const heroes = useSelector(selectHeroes);
  const heroesLoading = useSelector(selectHeroesLoading);
  const isDeleting = useSelector(selectIsDeleting);

  // Redirect to landing if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Fetch heroes on mount
  useEffect(() => {
    dispatch(fetchHeroes());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handlePlayHero = (heroId) => {
    // TODO: Navigate to game view with selected hero
    // For now, just log the selection
    console.log('Playing hero:', heroId);
    // Future: navigate(`/game/${heroId}`);
  };

  const handleDeleteHero = (heroId) => {
    dispatch(deleteHero(heroId));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Header */}
      <header
        className="py-4 px-6 flex justify-between items-center border-b"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)'
        }}
      >
        <h1
          className="text-2xl font-bold tracking-wide"
          style={{ color: 'var(--color-accent)' }}
        >
          AVANDRIA
        </h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-primary)'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2
            className="text-3xl font-semibold mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Welcome back, {account?.username || 'Adventurer'}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Choose a hero to continue your adventure, or create a new one.
          </p>
        </div>

        {/* Heroes Section */}
        <div
          className="rounded-lg p-6 mb-8"
          style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3
              className="text-xl font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Your Heroes
            </h3>
            <span
              className="text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {heroes.length} / 5 slots
            </span>
          </div>

          {/* Loading State */}
          {heroesLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Heroes Grid */}
          {!heroesLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Hero Cards */}
              {heroes.map((hero) => (
                <HeroCard
                  key={hero.id}
                  hero={hero}
                  onPlay={handlePlayHero}
                  onDelete={handleDeleteHero}
                  isDeleting={isDeleting}
                />
              ))}

              {/* Create New Hero Card */}
              {heroes.length < 5 && (
                <button
                  onClick={() => navigate('/create-hero')}
                  className="p-8 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all hover:border-solid hover:border-primary/50 min-h-[200px]"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-muted)'
                  }}
                >
                  <span className="text-4xl">+</span>
                  <span>Create New Hero</span>
                </button>
              )}

              {/* Empty State */}
              {heroes.length === 0 && !heroesLoading && (
                <div
                  className="col-span-full text-center py-8"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <p className="mb-2">You don&apos;t have any heroes yet.</p>
                  <p>Create your first hero to begin your adventure!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Account Stats */}
        <div
          className="rounded-lg p-6"
          style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        >
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Account Stats
          </h3>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                0h 0m
              </p>
              <p className="text-sm">Total Playtime</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                {heroes.length}
              </p>
              <p className="text-sm">Heroes Created</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                0
              </p>
              <p className="text-sm">Monsters Slain</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                0
              </p>
              <p className="text-sm">Gold Earned</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
