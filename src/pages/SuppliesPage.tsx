import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Search, Plus, Edit, Trash2, ListFilter, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Supply } from '../types/supply';
import SupplyModal from '../components/supplies/SupplyModal';
import apiClient from '../api/apiClient';

const fetchSupplies = async (): Promise<Supply[]> => {
  const res = await apiClient.get('/articuloInsumo/listar');
  return res.data;
};

const SuppliesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupply, setSelectedSupply] = useState<Supply | undefined>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    loadSupplies();
  }, []);

  const loadSupplies = async () => {
    try {
      setLoading(true);
      const data = await fetchSupplies();
      setSupplies(data);
    } catch (error) {
      console.error('Error loading supplies:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoriasUnicas = Array.from(
    new Map(
      supplies
        .map(s => s.categoria)
        .filter(Boolean)
        .map(c => [c!.id, c!])
    ).values()
  );

  const filteredSupplies = supplies.filter(supply => {
    const matchesSearch = supply.denominacion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || supply.categoria?.denominacion === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (supply: Supply) => {
    setSelectedSupply(supply);
    setIsModalOpen(true);
  };

  const handleDelete = async (supplyId: number) => {
  try {
    await apiClient.delete(`/articuloInsumo/${supplyId}`);
    await loadSupplies();
    setShowDeleteConfirm(null);
  } catch (error) {
    console.error('Error eliminando insumo:', error);
    alert('Hubo un error al eliminar el insumo.');
  }
};


 

  const getStockStatus = (supply: Supply) => {
    if (supply.stockActual <= (supply.stockMinimo ?? 0)) return 'critical';
    if (supply.stockActual <= (supply.stockMinimo ?? 0) * 1.5) return 'low';
    return 'normal';
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Insumos</h1>
          <p className="text-gray-600">Gestiona el inventario de insumos del restaurante</p>
        </div>
        <div className="flex gap-2">
          <Link to="/supplies/categories">
            <Button variant="outline" icon={<ListFilter size={18} />}>Categorías</Button>
          </Link>
          <Button variant="primary" icon={<Plus size={18} />} onClick={() => {
            setSelectedSupply(undefined);
            setIsModalOpen(true);
          }}>
            Nuevo Insumo
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
              placeholder="Buscar por nombre de insumo"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categoriasUnicas.map(category => (
                <option key={category.id} value={category.denominacion}>{category.denominacion}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insumo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio de compra</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSupplies.map((supply) => {
                const stockStatus = getStockStatus(supply);
                const stockPercentage = supply.stockMaximo ? (supply.stockActual / supply.stockMaximo) * 100 : 0;
                return (
                  <tr key={supply.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        {supply.denominacion}
                        {stockStatus === 'critical' && (
                          <AlertTriangle size={16} className="ml-2 text-red-500" />
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Unidad: {typeof supply.unidadMedida === 'string' ? supply.unidadMedida : supply.unidadMedida?.denominacion}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary" size="sm">
                        {supply.categoria?.denominacion || 'Sin categoría'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {supply.stockActual} / {supply.stockMaximo} {typeof supply.unidadMedida === 'string' ? supply.unidadMedida : supply.unidadMedida?.denominacion}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${stockStatus === 'critical' ? 'bg-red-500' :
                              stockStatus === 'low' ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                          style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Mín: {supply.stockMinimo} {typeof supply.unidadMedida === 'string' ? supply.unidadMedida : supply.unidadMedida?.denominacion}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${supply.precioCompra.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Edit size={16} />}
                          onClick={() => handleEdit(supply)}
                          aria-label="Editar insumo"
                        />
                        {showDeleteConfirm === supply.id ? (
                          <div className="flex space-x-1">
                            <Button variant="danger" size="sm" onClick={() => handleDelete(supply.id)}>Eliminar</Button>
                            <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(null)}>Cancelar</Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<Trash2 size={16} />}
                            onClick={() => setShowDeleteConfirm(supply.id)}
                            aria-label="Eliminar insumo"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <SupplyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSupply(undefined);
        }}
        onSaved={loadSupplies}
        supply={selectedSupply}
        categories={categoriasUnicas}
      />

    </Layout>
  );
};

export default SuppliesPage;
