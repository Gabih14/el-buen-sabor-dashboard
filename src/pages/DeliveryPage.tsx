import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  Search, 
  Filter, 
  Truck, 
  MapPin, 
  User, 
  Phone, 
  Clock, 
  CheckCircle, 
  AlertCircle
} from 'lucide-react';

// Mock delivery data
const deliveries = [
  {
    id: '1',
    orderId: '1002',
    customer: 'María González',
    address: 'Avenida Central 456, Ciudad',
    phone: '555-234-5678',
    items: [
      { name: 'Pizza Familiar', quantity: 1 },
      { name: 'Refresco', quantity: 2 }
    ],
    total: 32.00,
    status: 'in-transit',
    estimatedDeliveryTime: new Date(new Date().getTime() + 15 * 60000), // 15 minutes from now
    assignedTo: 'Miguel Torres',
    distance: '2.5 km'
  },
  {
    id: '2',
    orderId: '999',
    customer: 'Fernando Díaz',
    address: 'Calle Norte 789, Ciudad',
    phone: '555-987-6543',
    items: [
      { name: 'Hamburguesa Especial', quantity: 2 },
      { name: 'Papas Fritas', quantity: 2 },
      { name: 'Refresco Grande', quantity: 2 }
    ],
    total: 45.50,
    status: 'assigned',
    estimatedDeliveryTime: new Date(new Date().getTime() + 35 * 60000), // 35 minutes from now
    assignedTo: 'Miguel Torres',
    distance: '4.2 km'
  },
  {
    id: '3',
    orderId: '995',
    customer: 'Gabriela Vega',
    address: 'Avenida Sur 321, Ciudad',
    phone: '555-123-9876',
    items: [
      { name: 'Pollo Frito Familiar', quantity: 1 },
      { name: 'Ensalada de Col', quantity: 1 },
      { name: 'Puré de Papas', quantity: 1 },
      { name: 'Refresco Familiar', quantity: 1 }
    ],
    total: 52.75,
    status: 'delivered',
    estimatedDeliveryTime: new Date(new Date().getTime() - 25 * 60000), // 25 minutes ago
    actualDeliveryTime: new Date(new Date().getTime() - 20 * 60000), // 20 minutes ago
    assignedTo: 'Lucía Flores',
    distance: '3.7 km'
  },
  {
    id: '4',
    orderId: '989',
    customer: 'Roberto Méndez',
    address: 'Plaza Principal 55, Ciudad',
    phone: '555-555-1234',
    items: [
      { name: 'Tacos de Carne (10 pzs)', quantity: 1 },
      { name: 'Guacamole', quantity: 1 },
      { name: 'Cerveza', quantity: 2 }
    ],
    total: 38.25,
    status: 'failed',
    estimatedDeliveryTime: new Date(new Date().getTime() - 60 * 60000), // 60 minutes ago
    assignedTo: 'Miguel Torres',
    failureReason: 'Cliente no se encontraba en la dirección',
    distance: '5.1 km'
  }
];

const statusColors: Record<string, any> = {
  assigned: 'warning',
  'picked-up': 'info',
  'in-transit': 'primary',
  delivered: 'success',
  failed: 'danger'
};

const statusLabels: Record<string, string> = {
  assigned: 'Asignado',
  'picked-up': 'Recogido',
  'in-transit': 'En tránsito',
  delivered: 'Entregado',
  failed: 'Fallido'
};

const DeliveryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  // Format the time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate the time remaining for delivery
  const calculateTimeRemaining = (estimatedTime: Date) => {
    const now = new Date();
    const diffMs = estimatedTime.getTime() - now.getTime();
    
    if (diffMs <= 0) {
      return 'Ahora';
    }
    
    const diffMins = Math.round(diffMs / 60000);
    return `${diffMins} min`;
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Gestión de Entregas</h1>
          <p className="text-gray-600">Administra y realiza seguimiento de las entregas a domicilio</p>
        </div>
        <Button 
          variant="primary" 
          icon={<Truck size={18} />}
        >
          Asignar Repartidor
        </Button>
      </div>

      <div className="bg-white p-4 mb-6 rounded-lg shadow-md">
        <div className="flex flex-wrap border-b border-gray-200">
          <button
            className={`mr-8 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'active'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('active')}
          >
            Entregas Activas
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
          <button
            className={`mr-8 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'all'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('all')}
          >
            Todas
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por # de orden, cliente o repartidor" 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500" 
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" icon={<Filter size={16} />}>
              Filtros
            </Button>
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500">
              <option value="all">Todos los repartidores</option>
              <option value="Miguel Torres">Miguel Torres</option>
              <option value="Lucía Flores">Lucía Flores</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {deliveries.map((delivery) => (
          <Card 
            key={delivery.id} 
            className={`overflow-hidden hover:shadow-lg transition-shadow ${
              delivery.status === 'delivered' ? 'border-l-4 border-emerald-500' : 
              delivery.status === 'failed' ? 'border-l-4 border-red-500' : 
              'border-l-4 border-amber-500'
            }`}
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Orden #{delivery.orderId}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock size={14} />
                  <span>
                    {delivery.status === 'delivered' 
                      ? `Entregado a las ${formatTime(delivery.actualDeliveryTime!)}` 
                      : delivery.status === 'failed'
                      ? 'Entrega fallida'
                      : `Entrega en ${calculateTimeRemaining(delivery.estimatedDeliveryTime)}`}
                  </span>
                </div>
              </div>
              <Badge 
                variant={statusColors[delivery.status]}
                icon={delivery.status === 'delivered' ? <CheckCircle size={14} /> : 
                      delivery.status === 'failed' ? <AlertCircle size={14} /> : 
                      <Truck size={14} />}
              >
                {statusLabels[delivery.status]}
              </Badge>
            </div>
            
            <div className="mt-4">
              <div className="flex items-start gap-2 text-sm mb-2">
                <MapPin size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-800">{delivery.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm mb-2">
                <User size={16} className="text-gray-500 flex-shrink-0" />
                <span className="text-gray-800">{delivery.customer}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-gray-500 flex-shrink-0" />
                <span className="text-gray-800">{delivery.phone}</span>
              </div>
            </div>
            
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Repartidor:</span>
                <span className="font-medium text-sm">{delivery.assignedTo}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-500 text-sm">Distancia:</span>
                <span className="text-sm">{delivery.distance}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-500 text-sm">Total:</span>
                <span className="font-medium text-sm">${delivery.total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-4 border-t border-gray-100 pt-4">
              <h4 className="font-medium text-xs text-gray-500 mb-2">PEDIDO:</h4>
              <ul className="space-y-1">
                {delivery.items.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item.quantity}x {item.name}
                  </li>
                ))}
              </ul>
            </div>
            
            {delivery.status === 'assigned' && (
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">Rechazar</Button>
                <Button variant="primary" size="sm">Recoger</Button>
              </div>
            )}
            
            {delivery.status === 'in-transit' && (
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">Problema</Button>
                <Button variant="success" size="sm">Entregado</Button>
              </div>
            )}
            
            {delivery.status === 'failed' && (
              <div className="mt-4 p-3 bg-red-50 rounded-md">
                <p className="text-sm text-red-700">
                  <span className="font-medium">Razón: </span>
                  {delivery.failureReason}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default DeliveryPage;