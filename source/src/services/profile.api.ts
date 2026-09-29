// src/services/profile.api.ts
// File MỚI HOÀN TOÀN — chỉ import `api` (axios instance có sẵn) từ api.ts, không sửa file đó.
import { api } from './api';

export type Profile = {
  id: string;
  fullName: string;
  email: string;
  address?: string | null; // MỚI: địa chỉ giao hàng
  role?: 'ADMIN' | 'BUYER'; // MỚI: phân quyền
  createdAt?: string;
};

export async function fetchProfile() {
  const { data } = await api.get<{ user: Profile }>('/profile/me');
  return data.user;
}

export async function updateProfile(payload: { fullName?: string; address?: string }) {
  const { data } = await api.put<{ user: Profile }>('/profile/me', payload);
  return data.user;
}

export async function changeMyPassword(oldPassword: string, newPassword: string) {
  const { data } = await api.put<{ message: string }>('/profile/change-password', {
    oldPassword,
    newPassword,
  });
  return data.message;
}
