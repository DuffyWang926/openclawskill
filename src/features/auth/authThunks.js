import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiService';
// export const postLogin = createAsyncThunk(
//     'auth/postLogin',
//     async (payload) => {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login`, {
//         method: 'POST',
//         body: JSON.stringify(payload),
//       });
//       return res.json();
//     }
//   );

export const postLogin = createAsyncThunk(
  'auth/postLogin',
  async (payload, { rejectWithValue }) => {
      // Thunk 只负责准备 URL 和 Body，以及传递 rejectWithValue
      return await apiService({
          url: '/api/login',
          method: 'POST',
          body: { 
              email: payload.email, 
              pwd: payload.password 
          }, 
          rejectWithValue, // ⬅️ 传递给 apiService 用于错误回调
      });
  }
);