import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Search, Plus, Filter, Eye, ShoppingBag, Clock, Check, X, Truck } from 'lucide-react';

// Mock orders data
const orders = [
  { 
    id: '1001', 
    customer: { id: '1', name: 'Juan Pérez' },
    items: [
      { id: '101', name: 'Hamburguesa Clásica', quantity: 2, price: 12.50 },
      { id: '102', name: 'Papas Fritas', quantity: 1, price: 5.00 }
    ],
    totalAmount: 30.00, 
    status: 'completed', 
    orderType: 'delivery', 
    createdAt: new Date(2023, 9, 15, 15, 30),
    deliveryInfo: {
      deliveryPerson: 'Miguel Torres',
      address: 'Calle Principal 123, Ciudad',
      estimatedTime: '30 min'
    }
  },
  { 
    id: '1002', 
    customer: { id: '2', name: 'María González' },
    items: [
      { id: '103', name: 'Pizza Familiar', quantity: 1, price: 25.00 },
      { id: '104', name: 'Refresco', quantity: 2, price: 3.50 }
    ],
    totalAmount: 32.00, 
    status: 'in-delivery', 
    orderType: 'delivery', 
    createdAt: new Date(2023, 9, 15, 16, 15),
    deliveryInfo: {
      deliveryPerson: 'Miguel Torres',
      address: 'Avenida Central 456, Ciudad',
      estimatedTime: '15 min'
    }
  },
  { 
    id: '1003', 
    customer: { id: '3', name: 'Carlos Rodríguez' },
    items: [
      { id: '105', name: 'Tacos (5 pzs)', quantity: 2, price: 15.00 }
    ],
    totalAmount: 30.00, 
    status: 'preparing', 
    orderType: 'dine-in', 
    createdAt: new Date(2023, 9, 15, 16, 45)
  },
  { 
    id: '1004', 
    customer: { id: '4', name: 'Laura Sánchez' },
    items: [
      { id: '106', name: 'Ensalada César', quantity: 1, price: 10.50 },
      { id: '107', name: 'Sandwich de Pollo', quantity: 1, price: 12.75 },
      { id: '108', name: 'Agua Mineral', quantity: 1, price: 2.50 }
    ],
    totalAmount: 25.75, 
    status: 'pending', 
    orderType: 'takeout', 
    createdAt: new Date(2023, 9, 15, 17, 0)
  },
  { 
    id: '1005', 
    customer: { id: '5', name: 'Roberto Gómez' },
    items: [
      { id: '109', name: 'Pollo a la Parrilla', quantity: 2, price: 18.50 },
      { id: '110', name: 'Arroz', quantity: 2, price: 4.50 },
      { id: '111', name: 'Ensalada Mixta', quantity: 1, price: 7.50 },
      { id: '112', name: 'Refresco Familiar', quantity: 1, price: 6.50 }
    ],
    totalAmount: 60.00, 
    status: 'ready', 
    orderType: 'takeout', 
    createdAt: new Date(2023, 9, 15, 17, 20)
  },
];

const statusIcons: Record<string, any> = {
  pending: <Clock size={16} />,
  preparing: <ShoppingBag size={16} />,
  ready: <Check size={16} />,
  'in-delivery': <Truck size={16} />,
  completed: <Check size={16} />,
  cancelled: <X size={16} />,
};

const statusVariant: Record<string, any> = {
  pending: 'warning',
  preparing: 'info',
  ready: 'secondary',
  'in-delivery': 'primary',
  completed: 'success',
  cancelled: 'danger',
};

const statusLabel: Record<string, string> = {
  pending: 'Pendiente',
  preparing: 'Preparando',
  ready: 'Listo para entrega',
  'in-delivery': 'En entrega',
  completed: 'Completado',
  cancelled: 'Cancelado',
};

const orderTypeLabel: Record<string, string> = {
  'dine-in': 'En restaurante',
  'takeout': 'Para llevar',
  'delivery': 'Entrega a domicilio',
};

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Gestión de Órdenes</h1>
          <p className="text-gray-600">Administra todas las órdenes del restaurante</p>
        </div>
        <Button 
          variant="primary" 
          icon={<Plus size={18} />}
        >
          Nueva Orden
        </Button>
      </div>

      <div className="bg-white p-4 mb-6 rounded-lg shadow-md">
        <div className="flex flex-wrap border-b border-gray-200">
          <button
            className={`mr-8 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'all'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('all')}
          >
            Todas las órdenes
          </button>
          <button
            className={`mr-8 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'pending'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('pending')}
          >
            Pendientes
          </button>
          <button
            className={`mr-8 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'preparing'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('preparing')}
          >
            En preparación
          </button>
          <button
            className={`mr-8 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'delivery'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('delivery')}
          >
            En entrega
          </button>
          <button
            className={`mr-8 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'completed'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completadas
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por # de orden o cliente" 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500" 
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" icon={<Filter size={16} />}>
              Filtros
            </Button>
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500">
              <option value="">Últimos 7 días</option>
              <option value="">Hoy</option>
              <option value="">Ayer</option>
              <option value="">Últimos 30 días</option>
              <option value="">Personalizado</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Orden #{order.id}</h3>
                <p className="text-gray-500 text-sm">
                  {order.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <Badge 
                variant={statusVariant[order.status]}
                icon={statusIcons[order.status]}
              >
                {statusLabel[order.status]}
              </Badge>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cliente:</span>
                <span className="font-medium">{order.customer.name}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Tipo:</span>
                <span>{orderTypeLabel[order.orderType]}</span>
              </div>
              {order.orderType === 'delivery' && order.deliveryInfo && (
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Repartidor:</span>
                  <span>{order.deliveryInfo.deliveryPerson}</span>
                </div>
              )}
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Total:</span>
                <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-4 border-t border-gray-100 pt-4">
              <h4 className="font-medium text-sm mb-2">Productos:</h4>
              <ul className="space-y-1">
                {order.items.map((item) => (
                  <li key={item.id} className="text-sm flex justify-between">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                icon={<Eye size={16} />}
              >
                Ver detalles
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default OrdersPage;