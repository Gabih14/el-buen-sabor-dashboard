import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { LockIcon, UserIcon } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!username || !password) {
      setFormError('Por favor, complete todos los campos');
      return;
    }
    
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by AuthContext
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          id="username"
          label="Usuario"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          leftIcon={<UserIcon size={18} />}
          required
          autoFocus
          placeholder="Ingrese su nombre de usuario"
        />
        
        <Input
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<LockIcon size={18} />}
          required
          placeholder="Ingrese su contraseña"
          error={formError || error || undefined}
        />
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        className="w-full" 
        isLoading={isLoading}
      >
        Iniciar sesión
      </Button>
      
      <div className="text-sm text-center text-gray-600">
        <p>Credenciales de prueba:</p>
        <p>Usuario: admin, manager, employee, delivery</p>
        <p>Contraseña: password</p>
      </div>
    </form>
  );
};

export default LoginForm;