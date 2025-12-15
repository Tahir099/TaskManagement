import { asyncHandler } from "../middlewares/asyncHandler";
import { ITaskService } from "../services/interfaces/ITaskService";
import { Response } from "express";
import { ValidationUtil } from "../utils/validateDto";
import { createTaskDto } from "../dto/task/create-task.dto";
import { AuthenticatedRequest } from "../middlewares/authorize";
import { GuardedRequest } from "../guards/types";

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

  update = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const task = req.task!;
    const data = req.body;

    const updatedTask = await this.taskService.updateTask(task.id, data);
    res.json(updatedTask);
  });

  delete = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const task = req.task!;
    await this.taskService.deleteTask(task.id);
    res.status(204).send();
  });

  getTaskWithAssignments = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const taskId = req.params.taskId;
    const task = await this.taskService.getTaskWithAssignments(taskId);
    res.json(task);
  });

  assignUser = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const taskId = req.params.taskId;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const assignment = await this.taskService.assignUserToTask(taskId, userId);
    res.status(201).json(assignment);
  });

  unassignUser = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const taskId = req.params.taskId;
    const userId = req.params.userId;

    await this.taskService.unassignUserFromTask(taskId, userId);
    res.status(204).send();
  });

  getAssignments = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const taskId = req.params.taskId;
    const assignments = await this.taskService.getTaskAssignments(taskId);
    res.json(assignments);
  });
}
