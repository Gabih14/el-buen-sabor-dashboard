export interface ProductCategory {
  id: number;
  deleted: boolean;
  denominacion: string;
  esInsumo: boolean;
  subcategorias: Subcategoria[];
  sucursales: any[];
}

export interface Subcategoria {
  id: number;
  deleted: boolean;
  denominacion: string;
  esInsumo: boolean;
  subcategorias: Subcategoria[];
  sucursales: any[];
}