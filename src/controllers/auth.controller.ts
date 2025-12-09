import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { IAuthService } from "../services/interfaces/IAuthService";
import { RegisterDto } from "../dto/auth/register.dto";
import { LoginDto } from "../dto/auth/login.dto";
import { ValidationUtil } from "../utils/validateDto";

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name } = ValidationUtil.validate(
      RegisterDto,
      req.body
    );

    const user = await this.authService.register(email, password, name );
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
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      accessToken,
    });
  });

  refresh = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token not found" });
      return;
    }
    const tokens = await this.authService.refreshToken(refreshToken);

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken: tokens.accessToken,
    });
  });
}
