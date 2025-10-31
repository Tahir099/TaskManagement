import { Request, Response } from "express";
import { IUserService } from "../services/interfaces/IUserService";
import { asyncHandler } from "../middlewares/asynchHandler";
import { AppError } from "../errors/AppError";

export class UserController {
  constructor(private readonly userService: IUserService) {}

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const users = await this.userService.getAllUser();
    res.json(users);
  });

  getByID = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    if (!user) throw new AppError("User not found", 404);
    res.json(user);
  });

  getByEmail = async (req: Request, res: Response) => {
    const { email } = req.params;
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new AppError("User not found", 404);
    res.json(user);
  };

  create = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await this.userService.createUser(data);
    res.status(201).json(user);
  };
}
