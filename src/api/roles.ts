import apiClient from './apiClient';
import { Role } from '../types/employee';

export const fetchRoles = async (): Promise<Role[]> => {
  const response = await apiClient.get('/api/admin/roles');
  return response.data;
};

export const createRole = async (data: Partial<Role>): Promise<Role> => {
  const response = await apiClient.post('/api/admin/roles', data);
  return response.data;
};

export const updateRole = async (id: number, data: Partial<Role>): Promise<Role> => {
  const response = await apiClient.put(`/api/admin/roles/${id}`, data);
  return response.data;
};

export const deleteRole = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/admin/roles/${id}`);
};
