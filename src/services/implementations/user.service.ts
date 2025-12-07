import { User } from "../../generated/prisma";
import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAllUser(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async createUser(data: Partial<User>): Promise<User> {
    return this.userRepository.create(data);
  }
}
