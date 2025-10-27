import { Inject, Service } from "typedi";
import { IUserService } from "../services/interfaces/IUserService";
import { Request, Response } from "express";

@Service()
export class UserController {
  constructor(
    @Inject("UserService")
    private readonly userService: IUserService
  ) {}

  getAll = async (req: Request, res: Response) => {
    const users = await this.userService.getAllUser();
    res.json(users);
  };

  getByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  };

  getByEmail = async (req: Request, res: Response) => {
    const { email } = req.params;
    const user = await this.userService.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  };

  create = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await this.userService.createUser(data);
    res.status(201).json(user);
  };
}
