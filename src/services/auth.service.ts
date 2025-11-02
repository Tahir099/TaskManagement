import { User } from "../generated/prisma";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { IAuthService } from "./interfaces/IAuthService";
import bcrypt from "bcrypt";

export class AuthService implements IAuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async register(
    email: string,
    password: string,
    name: string,
    roleId: string
  ): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      roleId,
    });

    return user;
  }
}
