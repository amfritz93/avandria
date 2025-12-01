import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

// Get user from localStorage
const token = localStorage.getItem('token');
const account = JSON.parse(localStorage.getItem('account'));

const initialState = {
  account: account || null,
  token: token || null,
  isAuthenticated: !!token,
  isLoading: false,
  error: null
};

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get current user
export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, thunkAPI) => {
    try {
      const response = await authService.getMe();
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to get user';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update settings
export const updateSettings = createAsyncThunk(
  'auth/updateSettings',
  async (settings, thunkAPI) => {
    try {
      const response = await authService.updateSettings(settings);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update settings';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    authService.logout();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.account = action.payload.account;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.account = action.payload.account;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Me
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.account = action.payload.account;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Settings
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.account = action.payload.account;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.account = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  }
});

export const { clearError, reset } = authSlice.actions;
export default authSlice.reducer;
