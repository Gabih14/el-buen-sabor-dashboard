import React, { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import Badge from '../ui/Badge';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title = 'Dashboard' }) => {
  const { user } = useAuth0();
  const [notifications] = useState([
    { id: 1, text: 'Nueva orden recibida', time: '5 min' },
    { id: 2, text: 'Pedido #12345 entregado', time: '30 min' },
    { id: 3, text: 'Nuevo cliente registrado', time: '1 hora' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const initials =
    (user?.given_name?.[0] && user?.family_name?.[0]
      ? user.given_name[0] + user.family_name[0]
      : user?.name?.[0]) || '?';

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between h-16">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="mr-4 p-1 rounded-full hover:bg-gray-100 md:hidden"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="font-serif text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="search"
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Buscar..."
          />
        </div>

        <div className="relative">
          <button
            className="relative p-1 rounded-full hover:bg-gray-100"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={22} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="font-medium">Notificaciones</h3>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-800">{notification.text}</p>
                      <Badge variant="secondary" size="sm">{notification.time}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <button className="text-sm text-amber-600 font-medium hover:text-amber-700">
                  Ver todas las notificaciones
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-3">
          {user && (
            <>
              {user.picture ? (
                <img
                  src={user.picture}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-gray-700 font-medium text-sm">
                    {initials}
                  </span>
                </div>
              )}
              <span className="text-sm font-medium text-gray-700">
                {user.given_name || user.name}
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
