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

export interface ProductDetail {
  tipo: 'INSUMO' | 'PRODUCTO';
  cantidad: number;
  item: Supply | MenuItem;
}
export interface Supply {
  id: string;
  denominacion: string;
  categoriaId: string;
  categoria?: {
    id: string;
    denominacion: string;
  };
  unidadMedida: string;
  precioCompra: number;
  stockActual: number;
  stockMinimo?: number;
  status?: 'active' | 'inactive';
}
export interface MenuItem {
  id: string;
  denominacion: string;
  categoriaId: string;
  categoria: {
    id: string;
    denominacion: string;
  };
  imagenes: string[];
  precioVenta: number;
  descripcion: string;
  tiempoEstimadoMinutos: number;
  preparacion: string;
  detalles: ProductDetail[];
  // Legacy fields for compatibility
  name?: string;
  price?: number;
  category?: string;
  preparationTime?: number;
  availability?: boolean;
  status?: 'active' | 'inactive';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}