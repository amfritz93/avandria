import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import ThemeToggle from '../components/common/ThemeToggle';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, account } = useSelector((state) => state.auth);

  // Redirect to landing if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
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
          <h3
            className="text-xl font-semibold mb-6"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Your Heroes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Placeholder Hero Cards */}
            {account?.heroes?.length > 0 ? (
              account.heroes.map((hero, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderColor: 'var(--color-border)'
                  }}
                >
                  <p style={{ color: 'var(--color-text-primary)' }}>
                    Hero Slot {index + 1}
                  </p>
                </div>
              ))
            ) : null}

            {/* Create New Hero Card */}
            {(!account?.heroes || account.heroes.length < 5) && (
              <button
                onClick={() => navigate('/create-hero')}
                className="p-8 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors hover:border-solid"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-muted)'
                }}
              >
                <span className="text-4xl">+</span>
                <span>Create New Hero</span>
              </button>
            )}
          </div>
        </div>

        {/* Account Stats Placeholder */}
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
                {account?.heroes?.length || 0}
              </p>
              <p className="text-sm">Characters Created</p>
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
