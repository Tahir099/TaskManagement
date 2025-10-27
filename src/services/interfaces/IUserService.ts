import { User } from "../../generated/prisma";

export interface IUserService {
  getAllUser(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(data: Partial<User>): Promise<User>;
  getUserById(id: string): Promise<User | null>;
}
