// services/apiService.js

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
    rejectWithValue 
}) => {
    const fullUrl = `${API_BASE_URL}${url}`;

    try {
        const res = await fetch(fullUrl, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
            // 尝试读取后端返回的错误信息
            const errorData = await res.json().catch(() => ({}));
            
            const errorMessage = errorData.message || `API 请求失败，状态码: ${res.status}`;
            console.log('res errorMessage', errorMessage)
            // ⬅️ 关键：通过 rejectWithValue 传递错误信息，让 uiSlice 捕获
            return rejectWithValue(errorMessage); 
        }

        // 成功，返回数据
        return res.json();

    } catch (error) {
        // 网络或其他前端错误
        const networkErrorMessage = '网络连接失败，请检查您的网络';
        
        // ⬅️ 通过 rejectWithValue 传递网络错误信息
        return rejectWithValue(networkErrorMessage);
    }
};