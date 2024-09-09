import { createServer, IncomingMessage, ServerResponse } from "http";
import logger from "./middlewares/logger";
import cors from "./middlewares/cors";
import errorHandler from "./middlewares/errorHandler";
import bodyHandler from "./middlewares/bodyHandler";

import dotenv from "dotenv";
import runMiddlewares from "./middlewares/runMiddlewares";
import { routeRequest } from "./routes";

dotenv.config();

type NextFunction = (data?: any) => void;

type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => void;

const middlewares: Middleware[] = [cors, logger, bodyHandler];

const PORT = process.env.PORT || 3001;

const server = createServer(async (req, res) => {
  try {
    runMiddlewares(req, res, middlewares, (data?: any) => {
      routeRequest(req, res, data);
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
