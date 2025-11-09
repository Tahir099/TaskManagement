import { AppError } from "../errors/AppError";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { IAuthService } from "../services/interfaces/IAuthService";

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name, roleId } = req.body;

    if (!email || !password || !name || !roleId) {
      throw new AppError("All fields is required", 400);
    }

    const user = await this.authService.register(email, password, name, roleId);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError("Username and password are required", 400);
    }
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
