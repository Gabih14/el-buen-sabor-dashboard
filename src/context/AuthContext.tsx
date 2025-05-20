import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@elbuensabor.com',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    isFirstLogin: true,
    createdAt: new Date('2023-01-01')
  },
  {
    id: '2',
    username: 'manager',
    email: 'manager@elbuensabor.com',
    role: 'manager',
    firstName: 'Manager',
    lastName: 'User',
    isFirstLogin: false,
    createdAt: new Date('2023-02-01')
  },
  {
    id: '3',
    username: 'employee',
    email: 'employee@elbuensabor.com',
    role: 'employee',
    firstName: 'Employee',
    lastName: 'User',
    isFirstLogin: true,
    createdAt: new Date('2023-03-01')
  },
  {
    id: '4',
    username: 'delivery',
    email: 'delivery@elbuensabor.com',
    role: 'delivery',
    firstName: 'Delivery',
    lastName: 'Person',
    isFirstLogin: false,
    createdAt: new Date('2023-04-01')
  }
];

// All passwords are 'password' in this mock
const MOCK_PASSWORDS: Record<string, string> = {
  'admin': 'password',
  'manager': 'password',
  'employee': 'password',
  'delivery': 'password'
};

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = MOCK_USERS.find(u => u.username === username);
      
      if (!user || MOCK_PASSWORDS[username] !== password) {
        throw new Error('Invalid username or password');
      }
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      if (MOCK_PASSWORDS[currentUser.username] !== currentPassword) {
        throw new Error('Current password is incorrect');
      }
      
      // In a real app, this would update the password in the database
      // For this mock, we'll update our in-memory mock
      MOCK_PASSWORDS[currentUser.username] = newPassword;
      
      // Update user's first login status
      const updatedUser = {
        ...currentUser,
        isFirstLogin: false
      };
      
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updatePassword,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};