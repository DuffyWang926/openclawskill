import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiService';

export const upload = createAsyncThunk(
  'edit/upload',
  async (payload, { rejectWithValue, getState, dispatch}) => {
    console.log('payload',payload)
    const { formData } = payload
      return await apiService({
          url: '/upload',
          method: 'POST',
          body: formData,
          headers: {}, 
          rejectWithValue, // ⬅️ 传递给 apiService 用于错误回调
          getState,   // ⬅️ 传进去
        dispatch, 
      });
  }
);

export const uploadVideo = createAsyncThunk(
  'edit/uploadVideo',
  async (payload, { rejectWithValue, getState, dispatch}) => {
    console.log('payload',payload)
      return await apiService({
          url: '/removeVideo',
          method: 'POST',
          body: payload,
          headers: {}, 
          rejectWithValue, // ⬅️ 传递给 apiService 用于错误回调
          getState,   // ⬅️ 传进去
        dispatch, 
      });
  }
);

