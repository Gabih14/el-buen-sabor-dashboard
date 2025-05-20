import React from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Search, Plus, Edit, Trash2, UserPlus } from 'lucide-react';

// Mock customers data
const customers = [
  { 
    id: '1', 
    firstName: 'Juan', 
    lastName: 'Pérez', 
    email: 'juan.perez@example.com', 
    phone: '555-123-4567', 
    address: 'Calle Principal 123, Ciudad', 
    orderCount: 12, 
    lastOrderDate: new Date(2023, 9, 10)
  },
  { 
    id: '2', 
    firstName: 'María', 
    lastName: 'González', 
    email: 'maria.gonzalez@example.com', 
    phone: '555-234-5678', 
    address: 'Avenida Central 456, Ciudad', 
    orderCount: 8, 
    lastOrderDate: new Date(2023, 9, 12) 
  },
  { 
    id: '3', 
    firstName: 'Carlos', 
    lastName: 'Rodríguez', 
    email: 'carlos.rodriguez@example.com', 
    phone: '555-345-6789', 
    address: 'Plaza Mayor 789, Ciudad', 
    orderCount: 15, 
    lastOrderDate: new Date(2023, 9, 8) 
  },
  { 
    id: '4', 
    firstName: 'Laura', 
    lastName: 'Sánchez', 
    email: 'laura.sanchez@example.com', 
    phone: '555-456-7890', 
    address: 'Calle Secundaria 234, Ciudad', 
    orderCount: 5, 
    lastOrderDate: new Date(2023, 9, 14) 
  },
  { 
    id: '5', 
    firstName: 'Roberto', 
    lastName: 'Gómez', 
    email: 'roberto.gomez@example.com', 
    phone: '555-567-8901', 
    address: 'Avenida Norte 567, Ciudad', 
    orderCount: 10, 
    lastOrderDate: new Date(2023, 9, 5) 
  },
];

const CustomersPage: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Gestión de Clientes</h1>
          <p className="text-gray-600">Administra la información de los clientes</p>
        </div>
        <Button 
          variant="primary" 
          icon={<UserPlus size={18} />}
        >
          Nuevo Cliente
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
              placeholder="Buscar cliente por nombre, email o teléfono" 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500" 
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500">
              <option value="">Todos los clientes</option>
              <option value="recent">Clientes recientes</option>
              <option value="frequent">Clientes frecuentes</option>
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
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dirección
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedidos
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último pedido
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-amber-800 font-medium">
                          {customer.firstName[0]}{customer.lastName[0]}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {customer.firstName} {customer.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          Cliente #{customer.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={customer.orderCount > 10 ? 'success' : 'default'}
                      size="sm"
                    >
                      {customer.orderCount} pedidos
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.lastOrderDate.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={<Edit size={16} />}
                        aria-label="Editar cliente"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={<Trash2 size={16} />}
                        aria-label="Eliminar cliente"
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
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de <span className="font-medium">12</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Anterior</span>
                  &laquo;
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-amber-50 text-sm font-medium text-amber-600 hover:bg-amber-100"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  3
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Siguiente</span>
                  &raquo;
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomersPage;