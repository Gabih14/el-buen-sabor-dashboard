import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { ExternalLink } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'preparing' | 'ready' | 'in-delivery' | 'completed' | 'cancelled';
  date: string;
}

interface RecentOrdersTableProps {
  orders: Order[];
}

const statusVariant: Record<string, string> = {
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
  ready: 'Listo',
  'in-delivery': 'En entrega',
  completed: 'Completado',
  cancelled: 'Cancelado',
};

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Orden
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-600">
                #{order.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${order.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={statusVariant[order.status] as any}>
                  {statusLabel[order.status]}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/orders/${order.id}`}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    icon={<ExternalLink size={16} />}
                  >
                    Ver
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable;