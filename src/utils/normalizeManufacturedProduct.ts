import { MenuItem, ProductDetail } from '../types/menuItem';
import { Supply } from '../types/supply';

export function normalizeManufacturedProduct(product: any): MenuItem {
  return {
    ...product,
    detalles: (product.detalles || []).map((detalle: any): ProductDetail => {
      const insumo = detalle.articuloInsumo || {};

      const supplyItem: Supply = {
        id: insumo.id,
        denominacion: insumo.denominacion || 'Insumo',
        categoria: insumo.categoria || {
          id: 0,
          denominacion: 'Sin categoría',
          esInsumo: true,
        },
        unidadMedida: insumo.unidadMedida || 'unidad',
        precioVenta: insumo.precioVenta || 0,
        precioCompra: insumo.precioCompra || 0,
        stockActual: insumo.stockActual || 0,
        esParaElaborar: insumo.esParaElaborar || false,
      };

      return {
        tipo: 'INSUMO',
        cantidad: detalle.cantidad,
        item: supplyItem,
      };
    }),
  };
}
