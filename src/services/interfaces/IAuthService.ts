import { User } from "../../generated/prisma";

export interface IAuthService {
  register(
    email: string,
    password: string,
    name: string,
    roleId: string
  ): Promise<User>;

  login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
