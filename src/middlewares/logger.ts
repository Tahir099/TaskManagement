import pinoHttp from "pino-http";
import { logger } from "../config/logger";

export const httpLogger = pinoHttp({
  logger,
  customProps: (req) => ({ reqId: (req as any).id }),
  serializers: {
    req(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});
