import { AppError } from "../errors/AppError";
import { User } from "../generated/prisma";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { ISessionRepository } from "../repositories/interfaces/ISessionRepository";
import { IAuthService } from "./interfaces/IAuthService";
import { config } from "../config/index";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { v4 as uuid } from "uuid";

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sessionRepository: ISessionRepository
  ) {}

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
      { userId: user.id, email: user.email },
      config.jwt.accessSecret,
      { expiresIn: config.jwt.expiresIn as SignOptions["expiresIn"] }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn as SignOptions["expiresIn"] }
    );

    await this.sessionRepository.create({
      id: uuid(),
      userId: user.id,
      accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken };
  }


  async refreshToken(token: string): Promise<{ accessToken: string; refreshToken: string; }> {
    try{
      const decoded = jwt.verify(token , config.jwt.refreshSecret) as {
        userId:string
      }

      const session = await this.sessionRepository.findByRefreshToken(token)

      if(!session || !session.isActive){
        throw new AppError("Invalid session" , 401)
      }

      if(session.userId !== decoded.userId){
        throw new AppError("Invalid token ownership" , 401)
      }

      if(new Date() > session.expiresAt){
        throw new AppError("Session expired" , 401)
      }

      const newAccessToken = jwt.sign(
        {userId:session.userId} , config.jwt.accessSecret, {expiresIn:config.jwt.expiresIn as SignOptions["expiresIn"]}
      )

      const newRefreshToken = jwt.sign({userId:session.userId} , config.jwt.refreshSecret , {expiresIn:config.jwt.refreshExpiresIn as SignOptions["expiresIn"]})


      await this.sessionRepository.update(session.id , {
        accessToken:newAccessToken , 
        refreshToken:newRefreshToken,
        lastActivityAt:new Date()
      })

      return {
        accessToken:newAccessToken,
        refreshToken:newRefreshToken
      }
    }catch(err){
      throw new AppError("Invalid or expired refresh token" , 401)
    }
  }

  
}
