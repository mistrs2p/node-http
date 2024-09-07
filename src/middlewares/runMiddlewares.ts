import { IncomingMessage, ServerResponse } from "node:http";

import logger from "../middlewares/logger";
import cors from "../middlewares/cors";
import bodyHandler from "../middlewares/bodyHandler";

type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (data?: any) => void
) => void;

type ErrorHandler = (
  err: any,
  req: IncomingMessage,
  res: ServerResponse
) => void;

const middlewares: Middleware[] = [
  cors,
  logger,
  bodyHandler,
  // Add more middleware functions as needed.
];


const runMiddlewares = (
//   middlewares: Middleware[],
  req: IncomingMessage,
  res: ServerResponse
): void => {
  const execute = (index: number, data?: any): void => {
    if (index < middlewares.length) {
      middlewares[index](req, res, (nextData) => execute(index + 1, nextData));
    }
  };

  execute(0);
};

export default runMiddlewares;
