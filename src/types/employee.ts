// src/types/employee.ts

export interface Role {
  id: number;
  name: string;
  description: string;
  auth0RoleId: string;
  deleted: boolean;
}

export interface Employee {
  id: number;
  userEmail: string;
  name: string;
  lastName: string | null;
  nickName: string;
  auth0Id: string;
  roles: Role[];
  deleted: boolean;
}
