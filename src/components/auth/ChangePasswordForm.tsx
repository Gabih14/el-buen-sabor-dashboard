import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { LockIcon } from 'lucide-react';

const ChangePasswordForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { updatePassword, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setFormError('Por favor, complete todos los campos');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setFormError('Las contraseñas nuevas no coinciden');
      return;
    }
    
    if (newPassword.length < 6) {
      setFormError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    try {
      await updatePassword(currentPassword, newPassword);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by AuthContext
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          id="current-password"
          label="Contraseña actual"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          leftIcon={<LockIcon size={18} />}
          required
          autoFocus
        />
        
        <Input
          id="new-password"
          label="Nueva contraseña"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          leftIcon={<LockIcon size={18} />}
          required
        />
        
        <Input
          id="confirm-password"
          label="Confirmar nueva contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          leftIcon={<LockIcon size={18} />}
          required
          error={formError || error || undefined}
        />
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        className="w-full" 
        isLoading={isLoading}
      >
        Cambiar contraseña
      </Button>
    </form>
  );
};

export default ChangePasswordForm;