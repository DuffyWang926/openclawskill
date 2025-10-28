// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { postLogin } from './authThunks';

const authSlice = createSlice({
  name: 'login',
  initialState: { 
    user: null, 
    loading: false,
    userId:'',
    isRegister:false,
    error: null 
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(postLogin.pending,  (s) => { s.loading = true; })
      .addCase(postLogin.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; })
      // .addCase(postLogin.rejected,  (s, a) => { s.loading = false; s.error = a.error.message; }),
});

export default authSlice.reducer;