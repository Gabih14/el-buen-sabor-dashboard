// src/api/employees.ts
import apiClient from './apiClient';
import { Employee } from '../types/employee';

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await apiClient.get<Employee[]>('/api/admin/users');
  return response.data;
};
