export interface ProductCategory {
  id: string;
  denominacion: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
  // Legacy field for compatibility
  name?: string;
}