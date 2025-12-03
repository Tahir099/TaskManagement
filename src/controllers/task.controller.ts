import { asyncHandler } from "../middlewares/asyncHandler";
import { ITaskService } from "../services/interfaces/ITaskService";
import { Request, Response } from "express";
import { ValidationUtil } from "../utils/validateDto";
import { createTaskDto } from "../dto/task/create-task.dto";
import { AuthenticatedRequest } from "../middlewares/authorize";

export class TaskController {
  constructor(private readonly taskService: ITaskService) {}

  create = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;


    const data = ValidationUtil.validate(createTaskDto, req.body);

    const task = await this.taskService.createTask({
      ...data,
      creatorId: userId,
    });
    res.status(201).json(task);
  });
}
