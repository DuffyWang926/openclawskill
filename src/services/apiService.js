// services/apiService.js
import { startLoading, stopLoading } from '@/features/ui/uiSlice';

const API_BASE_URL = process.env.NEXT_PUBLIC_URL;
/**
 * 通用的 API 请求封装服务
 * @param {object} options - 请求选项
 * @param {function} rejectWithValue - Redux Thunk 的 rejectWithValue 方法
 */
export const apiService = async ({ 
    url, 
    method = 'GET', 
    body, 
    headers = {},
    rejectWithValue,
    getState, 
    dispatch
}) => {
    const fullUrl = `${API_BASE_URL}${url}`;
    const isFormData = body instanceof FormData;
    const reqHeaders = isFormData
        ? headers // 用户传空，浏览器会补全 multipart
        : { 'Content-Type': 'application/json', ...headers };

    const fetchOptions = {
        method,
        headers: reqHeaders,
        body: isFormData ? body : JSON.stringify(body),
    };

    try {
        dispatch(startLoading());
        const res = await fetch(fullUrl, fetchOptions);

        if (!res.ok) {
            // 尝试读取后端返回的错误信息
            const errorData = await res.json().catch(() => ({}));
            
            const errorMessage = errorData.message || `API 请求失败，状态码: ${res.status}`;
            console.log('res errorMessage', errorMessage)
            // ⬅️ 关键：通过 rejectWithValue 传递错误信息，让 uiSlice 捕获
            return rejectWithValue({ code: res.status, message: errorData.message || null });
        }

        // 成功，返回数据
        return res.json();

    } catch (error) {
        return rejectWithValue({ code: 500, message: null });
    }finally {
        dispatch(stopLoading()); // ➜ 请求结束
    }
};