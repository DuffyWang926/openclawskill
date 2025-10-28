import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@/features/auth/authSlice';
import ui from '@/features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    ui,
  },
  devTools: process.env.NODE_ENV === 'development',
});