// src/api/employees.ts
import apiClient from './apiClient';
import { Employee } from '../types/employee';

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await apiClient.get<Employee[]>('/api/admin/users');
  return response.data;
};

// Crea un nuevo empleado
export const createEmployee = async (data: {
  name: string;
  lastName: string;
  userEmail: string;
  nickName: string;
  roles: string[]; // 👈 Array de auth0RoleId
}): Promise<Employee> => {
  const response = await apiClient.post('/api/admin/users/createUser', data);
  return response.data;
};

// Modifica un empleado existente
export const updateEmployee = async (
  id: number,
  data: {
    name: string;
    lastName: string;
    userEmail: string;
    nickName: string;
    roles: string[]; // 👈 Array de auth0RoleId
    auth0Id: string;
  }
): Promise<Employee> => {
  const response = await apiClient.put('/api/admin/users/modifyUser', {
    id,
    ...data,
    auth0Id: data.auth0Id,
  });
  return response.data;
};
