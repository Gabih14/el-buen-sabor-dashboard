import React, { useEffect, useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { MenuItem, Supply } from '../../types';
import { X, Plus, Trash2 } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<MenuItem>) => void;
  product?: MenuItem;
  categories: string[];
}

// Mock supplies for the ingredient selector
const mockSupplies: Supply[] = [
  {
    id: '1',
    denominacion: 'Harina',
    categoriaId: '1',
    unidadMedida: 'Gramos',
    precioCompra: 50.0,
    stockActual: 100
  },
  {
    id: '2',
    denominacion: 'Manteca',
    categoriaId: '1',
    unidadMedida: 'Gramos',
    precioCompra: 80.0,
    stockActual: 50
  },
  {
    id: '3',
    denominacion: 'Queso Mozzarella',
    categoriaId: '2',
    unidadMedida: 'Gramos',
    precioCompra: 120.0,
    stockActual: 200
  }
];

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
  categories,
}) => {
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    denominacion: '',
    descripcion: '',
    precioVenta: 0,
    categoriaId: '',
    tiempoEstimadoMinutos: 0,
    preparacion: '',
    detalles: [],
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        denominacion: '',
        descripcion: '',
        precioVenta: 0,
        categoriaId: '',
        tiempoEstimadoMinutos: 0,
        preparacion: '',
        detalles: [],
      });
    }
  }, [product]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addIngredient = () => {
    const newDetail = {
      tipo: 'INSUMO' as const,
      cantidad: 0,
      item: mockSupplies[0]
    };
    setFormData({
      ...formData,
      detalles: [...(formData.detalles || []), newDetail]
    });
  };

  const removeIngredient = (index: number) => {
    const newDetalles = [...(formData.detalles || [])];
    newDetalles.splice(index, 1);
    setFormData({
      ...formData,
      detalles: newDetalles
    });
  };

  const updateIngredient = (index: number, field: string, value: any) => {
    const newDetalles = [...(formData.detalles || [])];
    if (field === 'supply') {
      newDetalles[index].item = value;
    } else if (field === 'cantidad') {
      newDetalles[index].cantidad = value;
    }
    setFormData({
      ...formData,
      detalles: newDetalles
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-serif font-bold text-gray-800">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Nombre del producto"
                value={formData.denominacion}
                onChange={(e) => setFormData({ ...formData, denominacion: e.target.value })}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                rows={3}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                required
              />
            </div>

            <div>
              <Input
                label="Precio de venta"
                type="number"
                step="0.01"
                value={formData.precioVenta}
                onChange={(e) => setFormData({ ...formData, precioVenta: parseFloat(e.target.value) })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                value={formData.categoriaId}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  categoriaId: e.target.value,
                  categoria: {
                    id: e.target.value,
                    denominacion: categories[parseInt(e.target.value) - 1] || ''
                  }
                })}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((category, index) => (
                  <option key={index} value={index + 1}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Input
                label="Tiempo de preparación (minutos)"
                type="number"
                value={formData.tiempoEstimadoMinutos}
                onChange={(e) => setFormData({ ...formData, tiempoEstimadoMinutos: parseInt(e.target.value) })}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preparación
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                rows={3}
                value={formData.preparacion}
                onChange={(e) => setFormData({ ...formData, preparacion: e.target.value })}
                placeholder="Describe el proceso de preparación..."
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Insumos necesarios
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={<Plus size={16} />}
                  onClick={addIngredient}
                >
                  Agregar insumo
                </Button>
              </div>
              
              <div className="space-y-3">
                {formData.detalles?.map((detalle, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md">
                    <div className="flex-1">
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                        value={(detalle.item as Supply).id}
                        onChange={(e) => {
                          const supply = mockSupplies.find(s => s.id === e.target.value);
                          if (supply) updateIngredient(index, 'supply', supply);
                        }}
                      >
                        {mockSupplies.map(supply => (
                          <option key={supply.id} value={supply.id}>
                            {supply.denominacion} ({supply.unidadMedida})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-32">
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Cantidad"
                        value={detalle.cantidad}
                        onChange={(e) => updateIngredient(index, 'cantidad', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="text-sm text-gray-500 w-20">
                      {(detalle.item as Supply).unidadMedida}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      icon={<Trash2 size={16} />}
                      onClick={() => removeIngredient(index)}
                    />
                  </div>
                ))}
                
                {(!formData.detalles || formData.detalles.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    No hay insumos agregados. Haz clic en "Agregar insumo" para comenzar.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;