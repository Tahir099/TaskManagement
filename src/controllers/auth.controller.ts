import { AppError } from "../errors/AppError";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { IAuthService } from "../services/interfaces/IAuthService";

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name, roleId } = req.body;

    if (!email || !password || !name || !roleId) {
      throw new AppError("All fields is required");
    }

    const user = await this.authService.register(email, password, name, roleId);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  });
  // getByID = asyncHandler(async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   const user = await this.userService.getUserById(id);
  //   if (!user) throw new AppError("User not found", 404);
  //   res.json(user);
  // });
}
