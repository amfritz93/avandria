import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import heroReducer from './heroSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    heroes: heroReducer
  },
  devTools: import.meta.env.DEV
});

export default store;
