import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { API_BASE_URL } from '../constants/config';

const TOKEN_KEY = 'auth_token';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Helper xử lý lưu trữ token cross-platform (Web + Mobile)
export async function saveToken(token: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  }
}

export async function getToken(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function clearToken(): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.removeItem(TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
}

// Tự động gắn token vào mọi request (nếu có)
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Trả lỗi dạng message dễ hiểu để hiển thị lên UI
api.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error?.response?.data?.message || 'Không thể kết nối máy chủ, vui lòng thử lại';
    return Promise.reject(new Error(message));
  }
);

// ---------- Auth ----------
export type User = {
  id: string;
  fullName: string;
  email: string;
  role?: 'ADMIN' | 'BUYER'; // MỚI: phân quyền — mặc định BUYER nếu không có
};

export async function loginRequest(email: string, password: string) {
  const { data } = await api.post<{ token: string; user: User }>('/auth/login', {
    email,
    password,
  });
  return data;
}

export async function registerRequest(fullName: string, email: string, password: string) {
  const { data } = await api.post<{ token: string; user: User }>('/auth/register', {
    fullName,
    email,
    password,
  });
  return data;
}

export async function fetchMe() {
  const { data } = await api.get<{ user: User }>('/auth/me');
  return data.user;
}
