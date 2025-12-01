import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/themeSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg transition-colors"
      style={{
        backgroundColor: 'var(--color-bg-tertiary)',
        color: 'var(--color-text-primary)'
      }}
      title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
    >
      {mode === 'dark' ? (
        // Sun icon for dark mode (click to switch to light)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon icon for light mode (click to switch to dark)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
