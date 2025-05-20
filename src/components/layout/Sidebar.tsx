import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  ShoppingBag, 
  Truck, 
  BarChart3, 
  Settings, 
  ChevronDown, 
  Menu, 
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

const Sidebar: React.FC<SidebarProps> = ({ isMobile = false, onClose }) => {
  const { currentUser, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Filter sidebar items based on user role
  const filteredItems = SIDEBAR_ITEMS.filter(
    item => currentUser && item.allowedRoles.includes(currentUser.role)
  );

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`bg-white h-full flex flex-col border-r border-gray-200 ${isMobile ? 'w-full' : 'w-64'}`}>
      {isMobile && (
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Coffee className="w-6 h-6 text-red-600" />
            <span className="font-serif text-xl font-bold">El Buen Sabor</span>
          </div>
          <button onClick={onClose} className="p-1">
            <X size={24} className="text-gray-500" />
          </button>
        </div>
      )}
      
      {!isMobile && (
        <div className="p-4 flex items-center space-x-2 border-b border-gray-200">
          <Coffee className="w-6 h-6 text-red-600" />
          <span className="font-serif text-xl font-bold">El Buen Sabor</span>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {filteredItems.map((item) => (
            <li key={item.path}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center justify-between w-full px-4 py-2 text-left rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-gray-500">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-red-50 text-red-600'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`
                  }
                  onClick={isMobile ? onClose : undefined}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      {currentUser && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-gray-700 font-medium">
                {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
              </span>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{currentUser.firstName} {currentUser.lastName}</p>
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