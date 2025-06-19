import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  ShoppingBag,
  Truck,
  BarChart3,
  Settings,
  Coffee,
  X,
  LogOut
} from 'lucide-react';
import Button from '../ui/Button';

const SIDEBAR_ITEMS = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/dashboard',
    allowedRoles: ['admin', 'manager', 'employee', 'delivery'],
  },
  {
    label: 'Clientes',
    icon: <Users size={20} />,
    path: '/customers',
    allowedRoles: ['admin', 'manager', 'employee'],
  },
  {
    label: 'Empleados',
    icon: <UserCircle size={20} />,
    path: '/employees',
    allowedRoles: ['admin', 'manager'],
  },
  {
    label: 'Órdenes',
    icon: <ShoppingBag size={20} />,
    path: '/orders',
    allowedRoles: ['admin', 'manager', 'employee', 'delivery'],
  },
  {
    label: 'Productos',
    icon: <ShoppingBag size={20} />,
    path: '/products',
    allowedRoles: ['admin', 'manager'],
  },
  {
    label: 'Delivery',
    icon: <Truck size={20} />,
    path: '/delivery',
    allowedRoles: ['admin', 'manager', 'delivery'],
  },
  {
    label: 'Reportes',
    icon: <BarChart3 size={20} />,
    path: '/reports',
    allowedRoles: ['admin', 'manager'],
  },
  {
    label: 'Configuración',
    icon: <Settings size={20} />,
    path: '/settings',
    allowedRoles: ['admin'],
  },
];

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const getRoleFromUser = (user: any): string => {
  const rolesKey = Object.keys(user || {}).find(key => key.includes('roles'));
  const rawRole = rolesKey && Array.isArray(user[rolesKey]) ? user[rolesKey][0] : 'guest';

  switch (rawRole.toLowerCase()) {
    case 'administrador': return 'admin';
    case 'empleado': return 'employee';
    case 'repartidor': return 'delivery';
    case 'gerente': return 'manager';
    default: return rawRole.toLowerCase();
  }
};

const Sidebar: React.FC<SidebarProps> = ({ isMobile = false, onClose }) => {
  const { user, logout, isAuthenticated } = useAuth0();

  const currentUser = isAuthenticated && user
    ? {
      firstName: user.given_name || user.name?.split(' ')[0] || '',
      lastName: user.family_name || user.name?.split(' ')[1] || '',
      role: getRoleFromUser(user),
    }
    : null;

  const filteredItems = SIDEBAR_ITEMS.filter(
    item => currentUser && item.allowedRoles.includes(currentUser.role)
  );

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className={`bg-white h-full flex flex-col border-r border-gray-200 ${isMobile ? 'w-full' : 'w-64'}`}>
      {isMobile ? (
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Coffee className="w-6 h-6 text-red-600" />
            <span className="font-serif text-xl font-bold">El Buen Sabor</span>
          </div>
          <button onClick={onClose} className="p-1">
            <X size={24} className="text-gray-500" />
          </button>
        </div>
      ) : (
        <div className="p-4 flex items-center space-x-2 border-b border-gray-200">
          <Coffee className="w-6 h-6 text-red-600" />
          <span className="font-serif text-xl font-bold">El Buen Sabor</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {filteredItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-colors ${isActive
                    ? 'bg-red-50 text-red-600'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
                onClick={isMobile ? onClose : undefined}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {currentUser && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-gray-700 font-medium">
                {currentUser.firstName.charAt(0)}
                {currentUser.lastName.charAt(0)}
              </span>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">
                {currentUser.firstName} {currentUser.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate capitalize">{currentUser.role}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-gray-700"
            icon={<LogOut size={16} />}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
