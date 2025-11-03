import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@/features/auth/authSlice';
import ui from '@/features/ui/uiSlice';
import edit from '@/features/edit/editSlice';
import home from '@/features/home/homeSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    ui,
    edit,
    home,
  },
  devTools: process.env.NODE_ENV === 'development',
});