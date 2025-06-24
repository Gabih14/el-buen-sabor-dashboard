import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Search, Plus, Edit, Trash2, Check, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ProductCategory } from '../types/product-category';
import CategoryModal from '../components/products/CategoryModal';
import apiClient from '../api/apiClient';



const ProductCategoriesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | undefined>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await apiClient.get<ProductCategory[]>('/categoria/listar');
      setCategories(res.data);
      console.log("categories",categories)
    } catch (err) {
      console.error('Error al obtener categorías', err);
    }
  };
  const filteredCategories = categories.filter((cat) =>
    cat.name && cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (category: ProductCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (categoryId: string) => {
    try {
      await apiClient.delete(`/product-categories/${categoryId}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    } catch (err) {
      console.error('Error al eliminar la categoría', err);
    }
    setShowDeleteConfirm(null);
  };

  const handleSave = async (data: Partial<ProductCategory>) => {
    try {
      if (selectedCategory) {
        // Actualizar
        const res = await apiClient.put(`/product-categories/${selectedCategory.id}`, data);
        setCategories((prev) =>
          prev.map((cat) => (cat.id === selectedCategory.id ? res.data : cat))
        );
      } else {
        // Crear nueva
        const res = await apiClient.post('/product-categories', data);
        setCategories((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error('Error al guardar la categoría', err);
    }
    setIsModalOpen(false);
    setSelectedCategory(undefined);
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/products" className="text-gray-500 hover:text-gray-700">
              <Button variant="ghost" size="sm" icon={<ArrowLeft size={18} />}>
                Volver a Productos
              </Button>
            </Link>
            <h1 className="text-2xl font-serif font-bold text-gray-800">Categorías de Productos</h1>
          </div>
          <p className="text-gray-600">Gestiona las categorías del menú</p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={18} />}
          onClick={() => {
            setSelectedCategory(undefined);
            setIsModalOpen(true);
          }}
        >
          Nueva Categoría
        </Button>
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

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de creación
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última actualización
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={category.status === 'active' ? 'success' : 'danger'}
                      size="sm"
                      icon={category.status === 'active' ? <Check size={14} /> : <X size={14} />}
                    >
                      {category.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.updatedAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Edit size={16} />}
                        onClick={() => handleEdit(category)}
                        aria-label="Editar categoría"
                      />
                      {showDeleteConfirm === category.id ? (
                        <div className="flex space-x-1">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(category.id)}
                          >
                            Eliminar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowDeleteConfirm(null)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Trash2 size={16} />}
                          onClick={() => setShowDeleteConfirm(category.id)}
                          aria-label="Eliminar categoría"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(undefined);
        }}
        onSave={handleSave}
        category={selectedCategory}
      />
    </Layout>
  );
};

export default ProductCategoriesPage;