import { User } from "../../generated/prisma";
import { IBaseRepository } from "../interfaces/IBaseRepository";

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
   