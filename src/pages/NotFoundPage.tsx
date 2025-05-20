import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Coffee, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="text-center">
        <Coffee className="h-16 w-16 text-red-600 mx-auto mb-4" />
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="mt-4 text-3xl font-serif font-bold text-gray-800">Página no encontrada</h2>
        <p className="mt-3 text-lg text-gray-600">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="mt-8">
          <Link to="/dashboard">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowLeft size={18} />}
            >
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;