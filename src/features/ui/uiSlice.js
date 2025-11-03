// features/ui/uiSlice.js
import { createSlice, isRejected } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    globalError: null,
    globalLoading: 0, // ➕ 全局 loading 计数器（0 表示未加载）
  },
  reducers: {
    clearGlobalError: (state) => {
      state.globalError = null;
    },
    // ➕ 控制 loading 的两个 action
    startLoading: (state) => {
      state.globalLoading += 1;
    },
    stopLoading: (state) => {
      state.globalLoading = Math.max(0, state.globalLoading - 1);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRejected, (state, action) => {
      const errorMessage = action.payload;
      if (errorMessage) state.globalError = errorMessage;
    });
  },
});

export const { clearGlobalError, startLoading, stopLoading } = uiSlice.actions;
export default uiSlice.reducer;