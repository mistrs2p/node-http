import { IncomingMessage, ServerResponse } from "node:http";

type NextFunction = (data?: any) => void;

type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => void;

const runMiddlewares = (
  req: IncomingMessage,
  res: ServerResponse,
  middlewares: Middleware[],
  next: NextFunction
) => {
  const run = (index: number, data?: any) => {
    if (index >= middlewares.length) {
      return next(data);
    }

    middlewares[index](req, res, (result) => {
      run(index + 1, result);
    });
  };

  run(0);
};
export default runMiddlewares;
