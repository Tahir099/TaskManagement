import { ITaskService } from "../services/interfaces/ITaskService";
import { Request, Response } from "express";

export class TaskController {
  constructor(private readonly taskService: ITaskService) {}
  getAll = async (req: Request, res: Response) => {
    const tasks = await this.taskService.getAllTasks();
    res.json(tasks);
  };
}
