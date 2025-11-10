import { AppError } from "../errors/AppError";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { IAuthService } from "../services/interfaces/IAuthService";
import { RegisterDto } from "../dto/auth/register.dto";
import { LoginDto } from "../dto/auth/login.dto";

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const parsedBody = RegisterDto.safeParse(req.body);

    if (!parsedBody.success) {
      const errorMessages = parsedBody.error.issues.map(
        (issue) => issue.message
      );
      throw new AppError(errorMessages.join(", "), 400);
    }

    const { email, password, name, roleId } = parsedBody.data;

    const user = await this.authService.register(email, password, name, roleId);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const parsedBody = LoginDto.safeParse(req.body);
    if (!parsedBody.success) {
      const errorMessage = parsedBody.error.issues.map(
        (issue) => issue.message
      );
      throw new AppError(errorMessage.join(", "), 400);
    }

    const { email, password } = parsedBody.data;

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
