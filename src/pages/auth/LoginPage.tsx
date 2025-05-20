import React from 'react';
import { Coffee } from 'lucide-react';
import LoginForm from '../../components/auth/LoginForm';
import Card from '../../components/ui/Card';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-amber-50 py-12 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-white rounded-full p-3 shadow-md mb-4">
            <Coffee className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">El Buen Sabor</h1>
          <p className="mt-2 text-gray-600">Sistema de Gestión de Restaurante</p>
        </div>
        
        <Card className="px-4 py-8 sm:px-10 shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-serif font-bold text-gray-900">Iniciar sesión</h2>
            <p className="mt-2 text-sm text-gray-600">
              Ingrese sus credenciales para acceder al sistema
            </p>
          </div>
          
          <LoginForm />
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} El Buen Sabor. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;