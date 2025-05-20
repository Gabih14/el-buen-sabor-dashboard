import React from 'react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import RecentOrdersTable from '../components/dashboard/RecentOrdersTable';
import Card from '../components/ui/Card';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Truck,
  TrendingUp
} from 'lucide-react';

// Mock data for recent orders
const recentOrders = [
  { id: '1001', customer: 'Juan Pérez', amount: 56.80, status: 'completed', date: '15 Oct, 2023 15:30' },
  { id: '1002', customer: 'María García', amount: 42.50, status: 'in-delivery', date: '15 Oct, 2023 16:15' },
  { id: '1003', customer: 'Carlos Rodríguez', amount: 29.99, status: 'preparing', date: '15 Oct, 2023 16:45' },
  { id: '1004', customer: 'Laura Sánchez', amount: 38.75, status: 'pending', date: '15 Oct, 2023 17:00' },
  { id: '1005', customer: 'Roberto Gómez', amount: 64.25, status: 'ready', date: '15 Oct, 2023 17:20' },
] as any;

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Ventas totales"
            value="$3,240.50"
            change={{ value: "12%", positive: true }}
            icon={<DollarSign size={24} />}
            color="emerald"
          />
          <StatCard
            title="Órdenes nuevas"
            value="45"
            change={{ value: "8%", positive: true }}
            icon={<ShoppingBag size={24} />}
            color="amber"
          />
          <StatCard
            title="Clientes nuevos"
            value="12"
            change={{ value: "5%", positive: true }}
            icon={<Users size={24} />}
            color="blue"
          />
          <StatCard
            title="Entregas pendientes"
            value="8"
            change={{ value: "3%", positive: false }}
            icon={<Truck size={24} />}
            color="red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders Section */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-serif font-bold text-gray-800">Órdenes Recientes</h2>
            <RecentOrdersTable orders={recentOrders} />
          </div>

          {/* Popular Items */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-gray-800">Platillos Populares</h2>
            <Card>
              <div className="space-y-4">
                {[
                  { name: 'Hamburguesa Clásica', sales: 145, amount: '$1,450.00' },
                  { name: 'Pizza Especial', sales: 120, amount: '$1,320.00' },
                  { name: 'Tacos Mixtos', sales: 98, amount: '$882.00' },
                  { name: 'Ensalada César', sales: 65, amount: '$455.00' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <div className="w-2 h-10 bg-red-500 rounded-full mr-4"></div>
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.sales} vendidos</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-800 font-medium">{item.amount}</span>
                      <TrendingUp size={16} className="ml-2 text-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Summary Card */}
            <Card title="Resumen del Mes" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Órdenes</span>
                  <span className="font-medium">152</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Ventas</span>
                  <span className="font-medium">$4,850.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Promedio</span>
                  <span className="font-medium">$31.90</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Clientes Nuevos</span>
                  <span className="font-medium">28</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">Crecimiento</span>
                  <span className="text-emerald-600 font-medium">+15% vs. mes anterior</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;