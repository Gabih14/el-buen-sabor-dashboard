import React, { useEffect, useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { X } from 'lucide-react';

interface RoleFormData {
  name: string;
  description: string;
}

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: RoleFormData) => void; // 👉 Ahora pasa solo datos del formulario
  role?: { name: string; description: string };
}

const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose, onSave, role }) => {
  const [formData, setFormData] = useState<RoleFormData>({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (role) {
      setFormData({ name: role.name, description: role.description });
    } else {
      setFormData({ name: '', description: '' });
    }
  }, [role]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // 👉 delega la lógica al padre
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-serif font-bold text-gray-800">
            {role ? 'Editar Rol' : 'Nuevo Rol'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <Input
            label="Nombre del Rol"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Descripción"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleModal;
