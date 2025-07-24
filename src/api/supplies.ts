import apiClient from './apiClient';
import { Supply } from '../types/supply';

export const fetchSupplies = async (): Promise<Supply[]> => {
  const response = await apiClient.get('/articuloInsumo/listar');
  return response.data;
};
