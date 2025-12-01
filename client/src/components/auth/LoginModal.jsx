import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../store/authSlice';

const LoginModal = ({ onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Clear any previous errors when modal opens
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  // Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-md mx-4 rounded-lg p-6"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl hover:opacity-70"
          style={{ color: 'var(--color-text-muted)' }}
        >
          &times;
        </button>

        {/* Title */}
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Login
        </h2>

        {/* Error Message */}
        {error && (
          <div
            className="mb-4 p-3 rounded-lg text-center"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: 'var(--color-error)'
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border focus:outline-none"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)'
              }}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border focus:outline-none"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-semibold transition-opacity disabled:opacity-50"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg-primary)'
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t" style={{ borderColor: 'var(--color-border)' }} />
          <span className="px-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            or
          </span>
          <div className="flex-1 border-t" style={{ borderColor: 'var(--color-border)' }} />
        </div>

        {/* Switch to Register */}
        <p className="text-center" style={{ color: 'var(--color-text-secondary)' }}>
          Don&apos;t have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="font-semibold hover:underline"
            style={{ color: 'var(--color-accent)' }}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
