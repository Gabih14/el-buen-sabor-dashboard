import React, { useEffect, useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { X } from 'lucide-react';
import { Role, Employee } from '../../types/employee';

interface EmployeeFormData {
  name: string;
  lastName: string;
  userEmail: string;
  nickName: string;
  roles: string[];
  password: string; // 👈 Nuevo campo
}

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EmployeeFormData) => void;
  employee?: Employee;
  roles: Role[]; // Lista de roles disponibles
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ isOpen, onClose, onSave, employee, roles }) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    lastName: '',
    userEmail: '',
    nickName: '',
    roles: [],
    password: '',
  });
  const [passwordError, setPasswordError] = useState<string>('');

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        lastName: employee.lastName ?? '',
        userEmail: employee.userEmail,
        nickName: employee.nickName,
        roles: employee.roles.map(r => r.auth0RoleId),
        password: '', // No mostrar la contraseña existente
      });
    } else {
      setFormData({
        name: '',
        lastName: '',
        userEmail: '',
        nickName: '',
        roles: [],
        password: '',
      });
    }
    setPasswordError('');
  }, [employee]);

  // Validación de contraseña fuerte
  const validatePassword = (pwd: string) => {
    // Mínimo 8 caracteres, una mayúscula, una minúscula y un número
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(pwd);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
      return;
    }
    setPasswordError('');
    onSave(formData);
  };

  const handleRoleChange = (auth0RoleId: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(auth0RoleId)
        ? prev.roles.filter(id => id !== auth0RoleId)
        : [...prev.roles, auth0RoleId],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-serif font-bold text-gray-800">
            {employee ? 'Editar Empleado' : 'Nuevo Empleado'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <Input
            label="Nombre"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Apellido"
            value={formData.lastName}
            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
          />
          <Input
            label="Email"
            value={formData.userEmail}
            onChange={e => setFormData({ ...formData, userEmail: e.target.value })}
            required
          />
          <Input
            label="Nickname"
            value={formData.nickName}
            onChange={e => setFormData({ ...formData, nickName: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Roles</label>
            <div className="flex flex-wrap gap-2">
              {roles.map(role => (
                <label key={role.auth0RoleId} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={formData.roles.includes(role.auth0RoleId)}
                    onChange={() => handleRoleChange(role.auth0RoleId)}
                  />
                  {role.name}
                </label>
              ))}
            </div>
          </div>
          <Input
            label="Contraseña"
            type="password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            required
          />
          {passwordError && (
            <div className="text-red-500 text-sm">{passwordError}</div>
          )}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;