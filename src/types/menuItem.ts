//src\types\menuItem.ts
import { Supply } from './supply';

export interface ProductDetail {
  tipo: 'INSUMO' | 'PRODUCTO';
  cantidad: number;
  item: Supply | MenuItem;
}
export interface MenuItem {
  id: string;
  denominacion: string;
  categoriaId: string;
  categoria: {
    id: string;
    denominacion: string;
  };
  imagenes: string[];
  type: string;
  precioVenta: number;
  descripcion: string;
  tiempoEstimadoMinutos: number;
  preparacion: string;
  detalles: ProductDetail[];
  // Legacy fields for compatibility
  name?: string;
  price?: number;
  category?: string;
  preparationTime?: number;
  availability?: boolean;
  status?: 'active' | 'inactive';
}