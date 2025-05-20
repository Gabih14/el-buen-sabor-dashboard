import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();

  // Update page title
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      document.title = `El Buen Sabor | Sistema de Gestión`;
    } else {
      document.title = `El Buen Sabor | Iniciar sesión`;
    }
  }, [isAuthenticated, currentUser]);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;