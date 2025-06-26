import { Role } from "./enums/role.enum";

export class User {
  id: string;
  email: string;
  password: string;
  name?: string;
  isActive: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}