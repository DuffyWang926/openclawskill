import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'home',
  initialState: { 
    originPath:'', 
    originStr:'', 
  },
  reducers: {
    setOriginPath(state, action) {
      state.originPath = action.payload;
    },
    setOriginStr(state, action) {
      state.originStr = action.payload;
    },
  },
  
});
export const { setOriginPath, setOriginStr } = authSlice.actions; 
export default authSlice.reducer;