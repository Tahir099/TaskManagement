import {
  createCommentDto,
  CreateCommentDto,
} from "../dto/comment/create-comment.dto";
import {
  updateCommentDto,
  UpdateCommentDto,
} from "../dto/comment/update-comment.dto";
import { AppError } from "../errors/AppError";
import { asyncHandler } from "../middlewares/asyncHandler";
import { ICommentService } from "../services/interfaces/ICommentService";
import { ValidationUtil } from "../utils/validateDto";
import { Response } from "express";
import { GuardedRequest } from "../guards/types";

export class CommentController {
  constructor(private readonly commentService: ICommentService) {}

  create = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const userId = req.user!.id;
    const data: CreateCommentDto = ValidationUtil.validate(
      createCommentDto,
      req.body
    );

    // Guard artıq task-a access yoxlayıb
    const comment = await this.commentService.createComment(
      data.taskId,
      userId,
      data.content
    );

    res.status(201).json({
      success: true,
      data: comment,
    });
  });
  getByTaskId = asyncHandler(
    async (req: GuardedRequest, res: Response) => {
      const { taskId } = req.params;

      if (!taskId) {
        throw new AppError("Task ID is required", 400);
      }

      const comments = await this.commentService.getCommentsByTaskId(taskId);

      res.status(200).json({
        success: true,
        data: comments,
        count: comments.length,
      });
    }
  );

  getById = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new AppError("Comment ID is required", 400);
    }

  
    const comment = await this.commentService.getCommentById(id);

    res.status(200).json({
      success: true,
      data: comment,
    });
  });

  update = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    if (!id) {
      throw new AppError("Comment ID is required", 400);
    }

    const data: UpdateCommentDto = ValidationUtil.validate(
      updateCommentDto,
      req.body
    );

  
    if (req.comment && req.comment.userId !== userId) {
      throw new AppError("You can only edit your own comments", 403);
    }

    const updatedComment = await this.commentService.updateComment(
      id,
      data.content
    );

    res.status(200).json({
      success: true,
      data: updatedComment,
    });
  });

  delete = asyncHandler(async (req: GuardedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    if (!id) {
      throw new AppError("Comment ID is required", 400);
    }

    // Guard artıq comment-ə və task-a access yoxlayıb
    // İstifadəçinin öz comment-ini yoxlayırıq
    if (req.comment && req.comment.userId !== userId) {
      throw new AppError("You can only delete your own comments", 403);
    }

    await this.commentService.deleteComment(id);

    res.status(204).send();
  });
}
