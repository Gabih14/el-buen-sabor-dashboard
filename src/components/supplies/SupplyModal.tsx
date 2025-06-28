import React, { useEffect, useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Supply } from '../../types/supply';
import { X } from 'lucide-react';
import apiClient from '../../api/apiClient'; // ⬅️ Import necesario

interface SupplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supply: Partial<Supply>) => void;
  supply?: Supply;
  categories: Array<{ id: number; denominacion: string; esInsumo: boolean }>;

}

type UnidadMedida = { id: number; denominacion: string };

const SupplyModal: React.FC<SupplyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  supply,
  categories,
}) => {
  const [formData, setFormData] = useState<Partial<Supply>>({
    denominacion: '',
    categoria: undefined,
    unidadMedida: undefined,
    precioCompra: 0,
    stockActual: 0,
    stockMinimo: 0,
    stockMaximo: 100,
    precioVenta: 0,
    esParaElaborar: false,
  });

  const [unitOptions, setUnitOptions] = useState<UnidadMedida[]>([]);

  useEffect(() => {
    if (supply) {
      setFormData(supply);
    } else {
      setFormData({
        denominacion: '',
        categoria: undefined,
        unidadMedida: undefined,
        precioCompra: 0,
        precioVenta: 0,
        stockActual: 0,
        stockMinimo: 0,
        stockMaximo: 100,
        esParaElaborar: false,
      });
    }
  }, [supply]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await apiClient.get('/unidadmedida');
        setUnitOptions(res.data);
      } catch (err) {
        console.error('Error cargando unidades de medida:', err);
      }
    };

    if (isOpen) fetchUnits();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-serif font-bold text-gray-800">
            {supply ? 'Editar Insumo' : 'Nuevo Insumo'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Nombre del insumo"
                value={formData.denominacion}
                onChange={(e) => setFormData({ ...formData, denominacion: e.target.value })}
                required
              />
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                value={formData.categoria?.id || ''}
                onChange={(e) => {
                  const selected = categories.find(cat => cat.id === Number(e.target.value));
                  setFormData({ ...formData, categoria: selected });
                }}
                required
              >
                {!formData.categoria && (
                  <option value="">Seleccionar categoría</option>
                )}
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.denominacion}
                  </option>
                ))}
              </select>
            </div>

            {/* Unidad de medida como SELECT */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unidad de medida</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                value={formData.unidadMedida && typeof formData.unidadMedida === 'object' ? formData.unidadMedida.id : ''}
                onChange={(e) => {
                  const selected = unitOptions.find(u => u.id === Number(e.target.value));
                  setFormData({ ...formData, unidadMedida: selected });
                }}
                required
              >
                {!formData.unidadMedida && (
                  <option value="">Seleccionar unidad</option>
                )}
                {unitOptions.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.denominacion}
                  </option>
                ))}
              </select>
            </div>

            {/* Otros campos */}
            <div>
              <Input
                label="Precio de compra"
                type="number"
                step="0.01"
                value={formData.precioCompra}
                onChange={(e) => setFormData({ ...formData, precioCompra: parseFloat(e.target.value) })}
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
              />
            </div>

            <div>
              <Input
                label="Stock actual"
                type="number"
                value={formData.stockActual}
                onChange={(e) => setFormData({ ...formData, stockActual: parseInt(e.target.value) })}
                required
              />
            </div>

            <div>
              <Input
                label="Stock mínimo"
                type="number"
                value={formData.stockMinimo}
                onChange={(e) => setFormData({ ...formData, stockMinimo: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <Input
                label="Stock máximo"
                type="number"
                value={formData.stockMaximo}
                onChange={(e) => setFormData({ ...formData, stockMaximo: parseInt(e.target.value) })}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="esParaElaborar"
                type="checkbox"
                checked={formData.esParaElaborar}
                onChange={(e) => setFormData({ ...formData, esParaElaborar: e.target.checked })}
              />
              <label htmlFor="esParaElaborar" className="text-sm text-gray-700">
                Es para elaborar
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplyModal;
