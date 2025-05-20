import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Calendar, Download, BarChart2, PieChart, TrendingUp, DollarSign, ShoppingBag, User, Users, Truck } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');

  // Sales trend data
  const salesData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Ventas 2024',
        data: [8500, 9200, 8900, 9800, 9100, 9600, 9400, 10200, 9854, 10500, 11200, 12000],
        borderColor: 'rgb(220, 38, 38)',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const salesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  // Order distribution data
  const orderDistributionData = {
    labels: ['Entrega', 'Para llevar', 'En restaurante'],
    datasets: [
      {
        data: [42, 35, 23],
        backgroundColor: [
          'rgb(245, 158, 11)',
          'rgb(220, 38, 38)',
          'rgb(16, 185, 129)'
        ],
        borderWidth: 0
      }
    ]
  };

  const orderDistributionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    cutout: '70%'
  };

  // Top products data
  const topProductsData = {
    labels: ['Hamburguesa Clásica', 'Pizza Especial', 'Tacos Mixtos', 'Ensalada César', 'Pasta Alfredo'],
    datasets: [
      {
        label: 'Ventas',
        data: [5437.50, 4238.00, 3731.00, 2016.00, 1815.00],
        backgroundColor: 'rgba(220, 38, 38, 0.8)',
        borderRadius: 4
      }
    ]
  };

  const topProductsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Reportes</h1>
          <p className="text-gray-600">Visualiza estadísticas y reportes del restaurante</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={16} className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Hoy</option>
              <option value="yesterday">Ayer</option>
              <option value="week">Últimos 7 días</option>
              <option value="month">Este mes</option>
              <option value="quarter">Últimos 3 meses</option>
              <option value="year">Este año</option>
            </select>
          </div>
          <Button variant="outline" icon={<Download size={16} />}>
            Exportar
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Ventas totales</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">$28,756.00</p>
            </div>
            <div className="p-2 rounded-full bg-amber-100 text-amber-600">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm text-emerald-600 font-medium flex items-center">
                <TrendingUp size={16} className="mr-1" /> +12.5%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Órdenes totales</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">843</p>
            </div>
            <div className="p-2 rounded-full bg-red-100 text-red-600">
              <BarChart2 size={24} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm text-emerald-600 font-medium flex items-center">
                <TrendingUp size={16} className="mr-1" /> +8.2%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Ticket promedio</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">$34.11</p>
            </div>
            <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm text-emerald-600 font-medium flex items-center">
                <TrendingUp size={16} className="mr-1" /> +3.7%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Nuevos clientes</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">126</p>
            </div>
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              <PieChart size={24} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm text-emerald-600 font-medium flex items-center">
                <TrendingUp size={16} className="mr-1" /> +15.3%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Trend Chart */}
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Tendencia de ventas</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Diario</Button>
              <Button variant="outline" size="sm">Semanal</Button>
              <Button variant="primary" size="sm">Mensual</Button>
            </div>
          </div>
          
          <div className="h-72">
            <Line data={salesData} options={salesOptions} />
          </div>
          
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Este mes</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">$9,854.00</p>
              <p className="text-xs text-emerald-600">+8.4%</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Mes pasado</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">$8,742.00</p>
              <p className="text-xs text-emerald-600">+5.1%</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Total anual</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">$95,245.00</p>
              <p className="text-xs text-emerald-600">+12.7%</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Pronóstico</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">$102,500.00</p>
              <p className="text-xs text-emerald-600">+7.6%</p>
            </div>
          </div>
        </Card>

        {/* Top Products */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Productos más vendidos</h3>
            <Button variant="outline" size="sm" icon={<Download size={16} />}>
              Exportar
            </Button>
          </div>
          
          <div className="h-96">
            <Bar data={topProductsData} options={topProductsOptions} />
          </div>
        </Card>

        {/* Order Types */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Distribución de órdenes</h3>
            <Button variant="outline" size="sm" icon={<Download size={16} />}>
              Exportar
            </Button>
          </div>
          
          <div className="h-64 mb-4">
            <Doughnut data={orderDistributionData} options={orderDistributionOptions} />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-amber-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <p className="text-sm font-medium text-gray-700">Entrega</p>
              </div>
              <p className="mt-2 text-xl font-semibold text-gray-900">42%</p>
              <p className="text-sm text-gray-500">354 órdenes</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <p className="text-sm font-medium text-gray-700">Para llevar</p>
              </div>
              <p className="mt-2 text-xl font-semibold text-gray-900">35%</p>
              <p className="text-sm text-gray-500">295 órdenes</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <p className="text-sm font-medium text-gray-700">En restaurante</p>
              </div>
              <p className="mt-2 text-xl font-semibold text-gray-900">23%</p>
              <p className="text-sm text-gray-500">194 órdenes</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity & Monthly Report */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Actividad reciente">
          <div className="divide-y divide-gray-200">
            {[
              { message: 'Se completó la orden #1023', time: 'Hace 5 minutos', type: 'order' },
              { message: 'Nuevo cliente registrado: Elena Ruiz', time: 'Hace 27 minutos', type: 'customer' },
              { message: 'Se rechazó la entrega de la orden #1015', time: 'Hace 1 hora', type: 'delivery' },
              { message: 'Se agregó un nuevo empleado: Marco Soto', time: 'Hace 3 horas', type: 'employee' },
              { message: 'Ventas del día superaron la meta diaria', time: 'Hace 5 horas', type: 'sales' },
            ].map((activity, index) => (
              <div key={index} className="py-3 flex items-start">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${activity.type === 'order' ? 'bg-blue-100 text-blue-600' : 
                    activity.type === 'customer' ? 'bg-emerald-100 text-emerald-600' : 
                    activity.type === 'delivery' ? 'bg-red-100 text-red-600' : 
                    activity.type === 'employee' ? 'bg-purple-100 text-purple-600' : 
                    'bg-amber-100 text-amber-600'}
                `}>
                  {activity.type === 'order' ? <ShoppingBag size={16} /> : 
                   activity.type === 'customer' ? <User size={16} /> : 
                   activity.type === 'delivery' ? <Truck size={16} /> : 
                   activity.type === 'employee' ? <Users size={16} /> : 
                   <BarChart2 size={16} />}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full" size="sm">
              Ver todo el historial
            </Button>
          </div>
        </Card>

        <Card title="Informe mensual">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Clientes nuevos</span>
              <span className="font-medium">126</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Clientes recurrentes</span>
              <span className="font-medium">418</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tasa de retención</span>
              <span className="font-medium">76.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ticket promedio</span>
              <span className="font-medium">$34.11</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Productos vendidos</span>
              <span className="font-medium">3,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Horas pico</span>
              <span className="font-medium">18:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Satisfacción del cliente</span>
              <span className="font-medium">4.8/5.0</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">Comparación anual</span>
              <span className="text-emerald-600 font-medium">+15.3% en ventas</span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default ReportsPage;