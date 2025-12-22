import { createSlice } from '@reduxjs/toolkit';
import { upload, uploadVideo } from './editThunks';
const authSlice = createSlice({
  name: 'edit',
  initialState: { 
    batchId:'-1',
    handlePaths:[],
    current:-1,
    videoUrl:'', 
    videoStr:'', 
  },
  reducers: {
    resetPath(state, action) {
      let path = action.payload
      state.handlePaths = [path];
      state.current = 0;
      state.videoUrl = '';
    },
    setVideoStr(state, action) {
      console.log('setVideoStr', action.payload)
      state.videoStr = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(upload.pending,  (s) => { s.loading = true; })
      .addCase(upload.fulfilled, (state, { payload }) => {
        const {data } = payload
        const { batchId, originPath, resultPath } = data
        let initCurrent = state.current
        let initPaths = state.handlePaths
        if(initCurrent == 0){
          initPaths = [originPath, resultPath];
        }else{
          initPaths.push(resultPath)
        }
        state.handlePaths = initPaths;
        state.current = initCurrent + 1;
        
      })
      .addCase(uploadVideo.pending, (s) => {
        s.loading = true;
      })
      .addCase(uploadVideo.fulfilled, (state, { payload }) => {
        const { data } = payload;
        const { url } = data
        state.loading = false;
        state.error = null;
        state.videoUrl = url; 
      })
  
});

export const { resetPath, setVideoStr } = authSlice.actions; 
export default authSlice.reducer;