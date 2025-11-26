import { PrismaClient } from "../generated/prisma";

class PrismaSingleton {
  private static instance: PrismaClient | null = null;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient({
        errorFormat:
          process.env.NaODE_ENV === "development" ? "pretty" : "minimal",
      });

      this.setupShutdownHandlers();
    }

    return PrismaSingleton.instance;
  }

  private static async shutdownPrisma() {
    if (PrismaSingleton.instance) {
      try {
        await PrismaSingleton.instance.$disconnect();
        console.log("Prisma Client disconnected successfully");
      } catch (error) {
        console.error("Error during Prisma Client shutdown", {
          error: error instanceof Error ? error.message : "Unknown error",
        });
        process.exit(1);
      } finally {
        PrismaSingleton.instance = null;
      }
    }
  }

  private static setupShutdownHandlers() {
    process.on("SIGTERM", this.shutdownPrisma);
    process.on("SIGINT", this.shutdownPrisma);
  }
}

const prisma = PrismaSingleton.getInstance();

export type { PrismaClient };
export default prisma;
