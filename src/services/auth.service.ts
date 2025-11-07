import { AppError } from "../errors/AppError";
import { User } from "../generated/prisma";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { IAuthService } from "./interfaces/IAuthService";
import { config } from "../config/index";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import prisma from "../config/prisma.config";
import { v4 as uuid } from "uuid";
import { Service, Inject } from "typedi";

@Service("AuthService")
export class AuthService implements IAuthService {
  constructor(@Inject("UserRepository") private readonly userRepository: IUserRepository) {}

  async register(
    email: string,
    password: string,
    name: string,
    roleId: string
  ): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new AppError("User already exists", 409);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      roleId,
    }); 

    return user;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError("User not found", 404);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new AppError("Email or password is not valid", 401);

    const accessToken = jwt.sign(
      { userID: user.id, email: user.email },
      config.jwt.accessSecret,
      { expiresIn: config.jwt.expiresIn as SignOptions["expiresIn"] }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn as SignOptions["expiresIn"] }
    );

    await prisma.session.create({
      data: {
        id: uuid(),
        userId: user.id,
        accessToken,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken };
  }
}
