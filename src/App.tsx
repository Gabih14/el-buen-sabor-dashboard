import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useAuth0 } from '@auth0/auth0-react';

const App: React.FC = () => {
  const { isAuthenticated, user } = useAuth0();

  // Update page title
  useEffect(() => {
    if (isAuthenticated && user) {
      document.title = `El Buen Sabor | Sistema de Gestión`;
    } else {
      document.title = `El Buen Sabor | Iniciar sesión`;
    }
  }, [isAuthenticated, user]);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;
