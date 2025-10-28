// features/ui/uiSlice.js

import { createSlice, isRejected } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        globalError: null, // ⬅️ 全局错误存储位置
    },
    reducers: {
        // 供 GlobalErrorNotifier 在 Modal 关闭时调用
        clearGlobalError: (state) => {
            state.globalError = null;
        }
    },
    extraReducers: (builder) => {
        // 🌟 核心：使用 addMatcher 捕获所有 Thunks 的 Rejected 状态
        builder.addMatcher(
            isRejected, 
            (state, action) => {
                console.log('ui err', action.payload)
                // 确保 action.payload 有值（即 Thunk 中使用了 rejectWithValue）
                const errorMessage = action.payload; 
                if (errorMessage) {
                    state.globalError = errorMessage; 
                }
            }
        );
    }
});

export const { clearGlobalError } = uiSlice.actions;
export default uiSlice.reducer;