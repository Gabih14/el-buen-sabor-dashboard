import React from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Search, UserPlus, Edit, Trash2, UserCheck, UserX } from 'lucide-react';

// Mock employees data
const employees = [
  { 
    id: '1', 
    firstName: 'Ana', 
    lastName: 'Martínez', 
    email: 'ana.martinez@elbuensabor.com', 
    phone: '555-111-2222', 
    role: 'manager', 
    hireDate: new Date(2022, 2, 15),
    status: 'active' 
  },
  { 
    id: '2', 
    firstName: 'Pedro', 
    lastName: 'López', 
    email: 'pedro.lopez@elbuensabor.com', 
    phone: '555-222-3333', 
    role: 'employee', 
    hireDate: new Date(2022, 5, 10),
    status: 'active' 
  },
  { 
    id: '3', 
    firstName: 'Luisa', 
    lastName: 'Hernández', 
    email: 'luisa.hernandez@elbuensabor.com', 
    phone: '555-333-4444', 
    role: 'employee', 
    hireDate: new Date(2022, 8, 5),
    status: 'active' 
  },
  { 
    id: '4', 
    firstName: 'Miguel', 
    lastName: 'Torres', 
    email: 'miguel.torres@elbuensabor.com', 
    phone: '555-444-5555', 
    role: 'delivery', 
    hireDate: new Date(2023, 1, 20),
    status: 'active' 
  },
  { 
    id: '5', 
    firstName: 'Lucía', 
    lastName: 'Flores', 
    email: 'lucia.flores@elbuensabor.com', 
    phone: '555-555-6666', 
    role: 'delivery', 
    hireDate: new Date(2023, 3, 12),
    status: 'inactive' 
  },
];

const roleLabels: Record<string, string> = {
  admin: 'Administrador',
  manager: 'Gerente',
  employee: 'Empleado',
  delivery: 'Repartidor',
};

const statusVariant: Record<string, any> = {
  active: 'success',
  inactive: 'danger',
};

const statusLabel: Record<string, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
};

const EmployeesPage: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Gestión de Empleados</h1>
          <p className="text-gray-600">Administra la información de los empleados</p>
        </div>
        <Button 
          variant="primary" 
          icon={<UserPlus size={18} />}
        >
          Nuevo Empleado
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
              placeholder="Buscar empleado por nombre, email o rol" 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500" 
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500">
              <option value="">Todos los roles</option>
              <option value="manager">Gerente</option>
              <option value="employee">Empleado</option>
              <option value="delivery">Repartidor</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500">
              <option value="">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
            <Button variant="outline">Filtrar</Button>
          </div>
        </div>
      </Card>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empleado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha contratación
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-800 font-medium">
                          {employee.firstName[0]}{employee.lastName[0]}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.firstName} {employee.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {employee.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.email}</div>
                    <div className="text-sm text-gray-500">{employee.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="primary" size="sm">
                      {roleLabels[employee.role]}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.hireDate.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={statusVariant[employee.status]}
                      size="sm"
                      icon={employee.status === 'active' ? <UserCheck size={14} /> : <UserX size={14} />}
                    >
                      {statusLabel[employee.status]}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={<Edit size={16} />}
                        aria-label="Editar empleado"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={<Trash2 size={16} />}
                        aria-label="Eliminar empleado"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de <span className="font-medium">5</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <span
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-300"
                >
                  <span className="sr-only">Anterior</span>
                  &laquo;
                </span>
                <span
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-amber-50 text-sm font-medium text-amber-600"
                >
                  1
                </span>
                <span
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-300"
                >
                  <span className="sr-only">Siguiente</span>
                  &raquo;
                </span>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeesPage;