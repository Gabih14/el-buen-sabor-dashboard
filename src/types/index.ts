export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  isFirstLogin: boolean;
  createdAt: Date;
}

export type Role = 'admin' | 'manager' | 'employee' | 'delivery';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  orderCount: number;
  lastOrderDate: Date | null;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  hireDate: Date;
  status: 'active' | 'inactive';
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  orderType: 'dine-in' | 'takeout' | 'delivery';
  createdAt: Date;
  deliveryInfo?: DeliveryInfo;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'in-delivery' | 'completed' | 'cancelled';

export interface DeliveryInfo {
  id: string;
  orderId: string;
  deliveryPersonId: string;
  deliveryPersonName: string;
  estimatedDeliveryTime: Date;
  actualDeliveryTime?: Date;
  status: 'assigned' | 'picked-up' | 'in-transit' | 'delivered' | 'failed';
  address: string;
  customerPhone: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  availability: boolean;
  preparationTime: number; // in minutes
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}