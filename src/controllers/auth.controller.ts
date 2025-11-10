import { AppError } from "../errors/AppError";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { IAuthService } from "../services/interfaces/IAuthService";
import { RegisterDto } from "../dto/auth/register.dto";
import { LoginDto } from "../dto/auth/login.dto";
import { ValidationUtil } from "../utils/validateDto";

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name, roleId } = ValidationUtil.validate(
      RegisterDto,
      req.body
    );

    const user = await this.authService.register(email, password, name, roleId);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = ValidationUtil.validate(LoginDto, req.body);

    const { accessToken, refreshToken } = await this.authService.login(
      email,
      password
    );

    res.status(201).json({
      accessToken,
      refreshToken,
    });
  });
}
