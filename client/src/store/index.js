import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import heroReducer from './heroSlice';
import navigationReducer from './navigationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    heroes: heroReducer,
    navigation: navigationReducer
  },
  devTools: import.meta.env.DEV
});

export default store;
