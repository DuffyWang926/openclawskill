import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiService';

export const postVerify = createAsyncThunk(
  'home/postVerify',
  async (payload, { rejectWithValue, getState, dispatch}) => {
      // Thunk 只负责准备 URL 和 Body，以及传递 rejectWithValue
      return await apiService({
          url: '/verify',
          method: 'POST',
          body: { 
              token: payload.token, 
          }, 
          rejectWithValue, // ⬅️ 传递给 apiService 用于错误回调
          getState,   // ⬅️ 传进去
        dispatch, 
      });
  }
);
