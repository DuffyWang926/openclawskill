import { createSlice } from '@reduxjs/toolkit';
import { postVerify, postUaPoints } from './homeThunks';
const authSlice = createSlice({
  name: 'home',
  initialState: { 
    originPath:'', 
    originStr:'', 
    isVerified:false,
    isShowVerify:false,
    token:'',
    canvasId:'',
    ua:'',
    isFree:false
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
    setUA(state, action) {
      const { 
        canvasId,
        ua
    } = action.payload;
      state.canvasId = canvasId;
      state.ua = ua;
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
      .addCase(postUaPoints.pending,  (s) => { s.loading = true; })
      .addCase(postUaPoints.fulfilled, (state, { payload }) => {
        const { data } = payload
        const { isSuccess } = data
        state.isFree = isSuccess;
      })
      
  
});
export const { setOriginPath, setOriginStr, setIsVerified, setIsShowVerify, setUA } = authSlice.actions; 
export default authSlice.reducer;