import { createSlice } from '@reduxjs/toolkit';
import { postVerify } from './homeThunks';
const authSlice = createSlice({
  name: 'home',
  initialState: { 
    originPath:'', 
    originStr:'', 
    isVerified:false,
    isShowVerify:false,
    token:'',
  },
  reducers: {
    setOriginPath(state, action) {
      state.originPath = action.payload;
    },
    setOriginStr(state, action) {
      state.originStr = action.payload;
    },
    setIsVerified(state, action) {
      const { isVerified, token } = action.payload;
      state.isVerified = isVerified;
      state.token = token;
    },
    setIsShowVerify(state, action) {
      const { isShowVerify } = action.payload;
      state.isShowVerify = isShowVerify;
    },
    
  },
  extraReducers: (builder) =>
    builder
      .addCase(postVerify.pending,  (s) => { s.loading = true; })
      .addCase(postVerify.fulfilled, (state, { payload }) => {
        const { data } = payload
        const { success } = data
        if(success){

        }else{
          state.isVerified = false;
        }
        
      })
  
});
export const { setOriginPath, setOriginStr, setIsVerified, setIsShowVerify } = authSlice.actions; 
export default authSlice.reducer;