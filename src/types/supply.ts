export interface Supply {
  id: number;
  denominacion: string;
  categoria: {
    id: number;
    denominacion: string;
    esInsumo: boolean;
  } | null;
  unidadMedida: 
    | string 
    | { id: number; denominacion: string };
  precioVenta: number;
  precioCompra: number;
  stockActual: number;
  stockMinimo?: number;
  stockMaximo?: number;
  esParaElaborar: boolean;
}
