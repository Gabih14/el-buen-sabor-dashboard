import apiClient from './apiClient';
import { Role } from '../types/employee';

interface RolePayload {
  name: string;
  description: string;
  auth0RoleId?: string; // Hacelo opcional para crear, requerido para update
}

// Trae todos los roles desde el backend
export const fetchRoles = async (): Promise<Role[]> => {
  const response = await apiClient.get('/api/admin/roles');
  return response.data;
};

// Crea un nuevo rol
export const createRole = async (data: RolePayload): Promise<Role> => {
  const response = await apiClient.post('/api/admin/roles/createRole', data);
  return response.data;
};

// Modifica un rol existente
export const updateRole = async (
  id: number,
  data: { name: string; description: string; auth0RoleId: string }
): Promise<Role> => {
  const response = await apiClient.put('/api/admin/roles/modifyRole', {
    id,
    name: data.name,
    description: data.description,
    auth0RoleId: data.auth0RoleId,
  });
  return response.data;
};

// Elimina un rol por ID (borrado lógico)
export const deleteRole = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/admin/roles/deleteRole?id=${id}`);
};
