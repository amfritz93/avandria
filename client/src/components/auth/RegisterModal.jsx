import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../store/authSlice';

const RegisterModal = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validationError, setValidationError] = useState('');
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
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    const { confirmPassword, ...registerData } = formData;
    dispatch(register(registerData));
  };

  // Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const displayError = validationError || error;

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
          Create Account
        </h2>

        {/* Error Message */}
        {displayError && (
          <div
            className="mb-4 p-3 rounded-lg text-center"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: 'var(--color-error)'
            }}
          >
            {displayError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={20}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)'
              }}
            />
          </div>

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

          <div className="mb-4">
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
              minLength={6}
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
              htmlFor="confirmPassword"
              className="block mb-2 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
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
            {isLoading ? 'Creating Account...' : 'Create Account'}
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

        {/* Switch to Login */}
        <p className="text-center" style={{ color: 'var(--color-text-secondary)' }}>
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="font-semibold hover:underline"
            style={{ color: 'var(--color-accent)' }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
