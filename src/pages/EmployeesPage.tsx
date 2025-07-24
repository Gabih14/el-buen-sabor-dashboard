// src/pages/EmployeesPage.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Search, UserPlus, Edit, Trash2, UserCheck, UserX, ListFilter } from 'lucide-react';
import { Employee } from '../types/employee';
import { fetchEmployees } from '../api/employees';
import { Link } from 'react-router-dom';
import EmployeeModal from '../components/employees/EmployeeModal';
import { fetchRoles } from '../api/roles';
import { createEmployee, updateEmployee } from '../api/employees'; // Debes tener estas funciones en tu api
import { Role } from '../types/employee';

const statusVariant: Record<string, any> = {
  active: 'success',
  inactive: 'danger',
};

const statusLabel: Record<string, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
};

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [empData, rolesData] = await Promise.all([
          fetchEmployees(),
          fetchRoles(),
        ]);
        setEmployees(empData);
        setRoles(rolesData.filter(r => !r.deleted));
      } catch (err) {
        console.error('Error al cargar empleados o roles:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async (data: {
    name: string;
    lastName: string;
    userEmail: string;
    nickName: string;
    roles: string[]; // 👈 Array de auth0RoleId
  }) => {
    try {
      let savedEmployee: Employee;
      if (selectedEmployee && selectedEmployee.id != null) {
        console.log('Datos enviados a modifyUser:', {
          id: selectedEmployee.id,
          ...data,
          auth0Id: selectedEmployee.auth0Id,
        });
        savedEmployee = await updateEmployee(selectedEmployee.id, {
          ...data,
          auth0Id: selectedEmployee.auth0Id,
        });
        setEmployees(prev =>
          prev.map(emp => (emp.id === savedEmployee.id ? savedEmployee : emp))
        );
      } else {
        savedEmployee = await createEmployee(data);
        setEmployees(prev => [...prev, savedEmployee]);
      }
      setIsModalOpen(false);
      setSelectedEmployee(undefined);
    } catch (error) {
      console.error('Error al guardar empleado:', error);
      alert('No se pudo guardar el empleado.');
    }
  };

  const openNewModal = () => {
    setSelectedEmployee(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const filteredEmployees = employees.filter(emp =>
    `${emp.name} ${emp.lastName ?? ''}`.toLowerCase().includes(search.toLowerCase()) ||
    emp.userEmail.toLowerCase().includes(search.toLowerCase()) ||
    emp.roles.some(role => role.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Gestión de Empleados</h1>
          <p className="text-gray-600">Administra la información de los empleados</p>
        </div>
        <div className="flex gap-2">
          <Link to="/employees/roles">
            <Button variant="outline" icon={<ListFilter size={18} />}>
              Roles
            </Button>
          </Link>
          <Button variant="primary" icon={<UserPlus size={18} />} onClick={openNewModal}>
            Nuevo Empleado
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
              placeholder="Buscar empleado por nombre, email o rol"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {loading ? (
        <div className="flex justify-center py-10 text-gray-500">Cargando empleados...</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-800 font-medium">
                            {emp.name[0]}{emp.lastName?.[0] ?? ''}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {emp.name} {emp.lastName ?? ''}
                          </div>
                          <div className="text-sm text-gray-500">ID: {emp.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{emp.userEmail}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {emp.roles.map((r) => (
                        <Badge key={r.id} variant="secondary" size="sm" className="mr-1">{r.name}</Badge>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" icon={<Edit size={16} />} onClick={() => openEditModal(emp)} />
                        <Button variant="ghost" size="sm" icon={<Trash2 size={16} />} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <EmployeeModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEmployee(undefined);
          }}
          onSave={handleSave}
          employee={selectedEmployee}
          roles={roles}
        />
      )}
    </Layout>
  );
};

export default EmployeesPage;
