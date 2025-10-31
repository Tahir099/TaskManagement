import { asyncHandler } from "../middlewares/asynchHandler";
import { ITaskService } from "../services/interfaces/ITaskService";
import { Request, Response } from "express";

export class TaskController {
  constructor(private readonly taskService: ITaskService) {}
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const tasks = await this.taskService.getAllTasks();
    res.json(tasks);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const task = await this.taskService.createTask(data);
    res.status(201).json(task);
  });
}
