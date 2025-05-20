import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

// A mapping of paths to their titles
const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/customers': 'Gestión de Clientes',
  '/employees': 'Gestión de Empleados',
  '/orders': 'Gestión de Órdenes',
  '/delivery': 'Gestión de Entregas',
  '/reports': 'Reportes',
  '/settings': 'Configuración',
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();

  // Get the current page title based on the path
  const getPageTitle = () => {
    return pageTitles[location.pathname] || 'Dashboard';
  };

  // Close the mobile sidebar when changing routes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close the sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      if (sidebar && !sidebar.contains(event.target as Node) && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  if (!currentUser) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gray-600 bg-opacity-75 transition-opacity"></div>
        <div id="mobile-sidebar" className="relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-all">
          <Sidebar isMobile={true} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <Sidebar />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} title={getPageTitle()} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;