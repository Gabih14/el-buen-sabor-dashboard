import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Role } from '../types/employee';
import { fetchRoles, deleteRole } from '../api/roles';

const EmployeeRolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      setLoading(true);
      const data = await fetchRoles();
      setRoles(data.filter(r => !r.deleted));
    } catch (error) {
      console.error('Error al cargar roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roleId: number) => {
    try {
      await deleteRole(roleId);
      setRoles(prev => prev.filter(r => r.id !== roleId));
    } catch (error) {
      console.error('Error al eliminar rol:', error);
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Roles de Empleados</h1>
          <p className="text-gray-600">Gestioná los roles disponibles para los usuarios</p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={18} />}
          onClick={() => {
            setSelectedRole(null);
            setIsModalOpen(true);
          }}
        >
          Nuevo Rol
        </Button>
      </div>

      <Card>
        {loading ? (
          <p className="text-gray-500">Cargando roles...</p>
        ) : roles.length === 0 ? (
          <p className="text-gray-500">No hay roles disponibles.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auth0 Role ID</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{role.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{role.auth0RoleId}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Edit size={16} />}
                        onClick={() => {
                          setSelectedRole(role);
                          setIsModalOpen(true);
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} />}
                        onClick={() => handleDelete(role.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Modal de creación/edición de roles (se puede hacer luego) */}
      {/* isModalOpen && (
        <RoleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={...}
          role={selectedRole}
        />
      ) */}
    </Layout>
  );
};

export default EmployeeRolesPage;
