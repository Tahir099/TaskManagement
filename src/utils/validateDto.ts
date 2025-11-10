import { ZodSchema, ZodError } from "zod";
import { AppError } from "../errors/AppError";

export class ValidationUtil {
  static validate<T>(schema: ZodSchema<T>, data: unknown): T {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        throw new AppError(
          "Validation failed",
          400,
          "VALIDATION_ERROR",
          errorMessages,
          true
        );
      }
      throw error;
    }
  }
}
