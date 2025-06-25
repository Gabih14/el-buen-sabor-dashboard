import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface SubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { denominacion: string; esInsumo: boolean }, parentCategoryId: number) => void;
  categories: Array<{ id: number; denominacion: string }>;
  selectedParentCategory: number | null;
  setSelectedParentCategory: (id: number) => void;
}

const SubcategoryModal: React.FC<SubcategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  categories,
  selectedParentCategory,
  setSelectedParentCategory,
}) => {
  const [form, setForm] = useState<{ denominacion: string; esInsumo: boolean }>({
    denominacion: '',
    esInsumo: false,
  });

  useEffect(() => {
    setForm({ denominacion: '', esInsumo: false });
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleParentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedParentCategory(Number(e.target.value));
  };

  const handleSubmit = () => {
    if (!form.denominacion || selectedParentCategory === null) return;
    onSave(
      { denominacion: form.denominacion, esInsumo: form.esInsumo },
      selectedParentCategory
    );
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        <div className="bg-white rounded-lg p-6 z-50 max-w-md w-full mx-auto shadow-lg relative">
          <Dialog.Title className="text-lg font-bold mb-4">
            Nueva Subcategoría
          </Dialog.Title>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Categoría Padre
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md"
                value={selectedParentCategory ?? ''}
                onChange={handleParentChange}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.denominacion}
                  </option>
                ))}
              </select>
            </label>
            <Input
              label="Denominación"
              name="denominacion"
              value={form.denominacion}
              onChange={handleChange}
              required
            />
            <div className="flex items-center gap-2">
              <input
                id="esInsumo"
                name="esInsumo"
                type="checkbox"
                checked={form.esInsumo}
                onChange={handleChange}
              />
              <label htmlFor="esInsumo" className="text-sm text-gray-700">
                ¿Es insumo?
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              Crear
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SubcategoryModal;
