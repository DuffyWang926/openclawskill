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
      .addCase(postLogin.fulfilled, (state, { payload }) => {
        const {data } = payload
        const { isRegister, userInfo = {} } = data
        const { id }  = userInfo
        state.loading = false;
        state.isRegister = isRegister;
        state.user   = userInfo;          
        state.userId = id;   
        state.error  = null;
      })
});
export default authSlice.reducer;