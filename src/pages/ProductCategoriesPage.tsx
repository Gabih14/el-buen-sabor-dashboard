import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Search, Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ProductCategory, Subcategoria } from '../types/product-category';
import apiClient from '../api/apiClient';
// 👇 Importa el modal
import SubcategoryModal from '../components/products/SubcategoryModal';

const ProductCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Estado para el modal
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [selectedParentCategory, setSelectedParentCategory] = useState<number | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategoria | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get<ProductCategory[]>('/categoria/listar');
      setCategories(res.data);
      console.log("categories", res.data);
    } catch (err) {
      console.error('Error al obtener categorías', err);
    } finally {
      setLoading(false);
    }
  };

  // Aplanar subcategorías con información de categoría padre
  const getAllSubcategories = () => {
    const allSubcategories: Array<Subcategoria & { parentCategory: string }> = [];

    categories.forEach(category => {
      category.subcategorias.forEach(subcategory => {
        if (!subcategory.deleted) {
          allSubcategories.push({
            ...subcategory,
            parentCategory: category.denominacion
          });
        }
      });
    });

    return allSubcategories;
  };

  const allSubcategories = getAllSubcategories();

  const filteredCategories = allSubcategories.filter((subcat) =>
    subcat.denominacion && subcat.denominacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: number) => {
    const found = allSubcategories.find((sub) => sub.id === id);
    if (found) {
      setEditingSubcategory(found);
      const parent = categories.find((cat) =>
        cat.subcategorias.some((s) => s.id === id)
      );
      if (parent) {
        setSelectedParentCategory(parent.id);
      }
      setShowSubcategoryModal(true);
    }
  };


  const handleDelete = (id: number) => {
    console.log('Eliminar subcategoría:', id);
    // Aquí iría la lógica para eliminar
  };

  const handleAddNew = () => {
    setSelectedParentCategory(categories.length > 0 ? categories[0].id : null);
    setShowSubcategoryModal(true);
  };

  //  Guardar subcategoría (puedes ajustar la lógica según tu backend)
  const handleSaveSubcategory = async (
    data: { id?: number; denominacion: string; esInsumo: boolean },
    parentCategoryId: number
  ) => {
    try {
      if (data.id) {
        // Si es edición
        await apiClient.post(`/categoria/subcategoria/actualizar/${data.id}`, {
          denominacion: data.denominacion,
          esInsumo: data.esInsumo,
        });
      } else {
        // Nueva subcategoría
        await apiClient.post(`/categoria/subcategoria/${parentCategoryId}`, data);
      }
      fetchCategories();
    } catch (err) {
      console.error('Error al guardar subcategoría', err);
    } finally {
      setEditingSubcategory(null);
      setShowSubcategoryModal(false);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <Link to="/products" className="text-gray-500 hover:text-gray-700">
          <Button variant="ghost" size="sm" icon={<ArrowLeft size={18} />}>
            Volver a Productos
          </Button>
        </Link>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-serif font-bold text-gray-800">Gestión de Subcategorías</h1>
          <Button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Nueva Subcategoría
          </Button>
        </div>

      </div>
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar categoría"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Denominación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría Padre
                </th>

                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    {searchTerm ? 'No se encontraron subcategorías que coincidan con la búsqueda.' : 'No hay subcategorías disponibles.'}
                  </td>
                </tr>
              ) : (
                filteredCategories.map((subcategory) => (
                  <tr key={subcategory.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {subcategory.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {subcategory.denominacion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {subcategory.parentCategory}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(subcategory.id)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(subcategory.id)}
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Mostrando {filteredCategories.length} de {allSubcategories.length} subcategorías
      </div>

      {/* 👇 Modal para agregar subcategoría */}
      <SubcategoryModal
        isOpen={showSubcategoryModal}
        onClose={() => {
          setShowSubcategoryModal(false);
          setEditingSubcategory(null);
        }}
        onSave={handleSaveSubcategory}
        categories={categories}
        selectedParentCategory={selectedParentCategory}
        setSelectedParentCategory={setSelectedParentCategory}
        initialData={
          editingSubcategory
            ? {
              id: editingSubcategory.id,
              denominacion: editingSubcategory.denominacion,
              categoriaId: selectedParentCategory || 0,
            }
            : undefined
        }
      />

    </Layout>
  );
};

export default ProductCategoriesPage;