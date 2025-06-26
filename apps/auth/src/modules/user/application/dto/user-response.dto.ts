import { Role } from "generated/prisma";

export class UserResponse {
  id: string;
  email: string;
  name:string;
  password:string;
  role: Role
  isActive:boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}