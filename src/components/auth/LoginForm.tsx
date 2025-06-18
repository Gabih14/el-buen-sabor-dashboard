// src/components/auth/LoginForm.tsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../ui/Button';

const LoginForm: React.FC = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <div className="text-center space-y-4">
      <Button
        onClick={() => loginWithRedirect()}
        isLoading={isLoading}
        variant="primary"
        className="w-full"
      >
        Iniciar sesión con Auth0
      </Button>
    </div>
  );
};

export default LoginForm;
