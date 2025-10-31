import { AppError } from "./AppError";

export function mapPrismaError(err: any): AppError | null {
  if (err?.code === "P2002") {
    return new AppError("Unique constraints violated", 409, "P2002");
  }
  if (err?.code === "P2025") {
    return new AppError("Record not found", 404, "P2025");
  } else return null;
}
