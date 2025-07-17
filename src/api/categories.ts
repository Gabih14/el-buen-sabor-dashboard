// api/categories.ts
import apiClient from './apiClient';
import { ProductCategory, Subcategoria } from '../types/product-category';

export interface FlatCategory {
  id: number;
  denominacion: string;
}

export const fetchCategories = async (): Promise<FlatCategory[]> => {
  const res = await apiClient.get<ProductCategory[]>('/categoria/listar');

  const flattenSubcategories = (categories: ProductCategory[]): FlatCategory[] => {
    const result: FlatCategory[] = [];

    for (const category of categories) {
      for (const sub of category.subcategorias) {
        if (!sub.esInsumo) {
          result.push({ id: sub.id, denominacion: sub.denominacion });

          // Si hay subcategorías anidadas:
          if (sub.subcategorias?.length) {
            const nested = sub.subcategorias
              .filter(s => !s.esInsumo)
              .map(s => ({ id: s.id, denominacion: s.denominacion }));
            result.push(...nested);
          }
        }
      }
    }

    return result;
  };

  return flattenSubcategories(res.data);
};
