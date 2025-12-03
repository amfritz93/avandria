import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import heroReducer from './heroSlice';
import navigationReducer from './navigationSlice';
import combatReducer from './combatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    heroes: heroReducer,
    navigation: navigationReducer,
    combat: combatReducer
  },
  devTools: import.meta.env.DEV
});

export default store;
