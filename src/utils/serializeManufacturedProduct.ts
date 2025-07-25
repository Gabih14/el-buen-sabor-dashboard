// src/utils/serializeManufacturedProduct.ts
import { MenuItem } from '../types/menuItem';

export function serializeManufacturedProduct(product: Partial<MenuItem>) {
    return {
        type: 'MANUFACTURADO',
        denominacion: product.denominacion,
        descripcion: product.descripcion,
        tiempoEstimadoMinutos: product.tiempoEstimadoMinutos,
        preparacion: product.preparacion,
        precioVenta: product.precioVenta,
        categoria: { id: Number(product.categoria?.id ?? product.categoriaId) },
        unidadMedida: { id: 1 }, // adaptar si hace falta
        detalles: (product.detalles || []).map((detalle) => ({
            cantidad: detalle.cantidad,
            articuloInsumo: {
                id: detalle.item.id,
                type: 'INSUMO',
            }
        }))
    };
}
