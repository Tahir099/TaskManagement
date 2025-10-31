import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: { console: true, translateTime: true },
        }
      : undefined,
  base: { service: "task-management-api" },
  redact: {
    paths: ["req.headers.authorization", "password", "*.password"],
    remove: true,
  },
});
