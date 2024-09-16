import { IncomingMessage, ServerResponse } from "node:http";
import bodyMiddleware from "./bodyMiddleware";
import corsMiddleware from "./corsMiddleware";
import loggerMiddleware from "./loggerMiddleware";
export interface DataArgs {
  body: any;
  query: Record<string, any>;
}
export type NextFunction = (data?: DataArgs) => void;
export type Middleware = (
  request: IncomingMessage,
  response: ServerResponse,
  next: NextFunction,
  data?: DataArgs
) => void;

export const MiddlewareList: Middleware[] = [bodyMiddleware, corsMiddleware, loggerMiddleware];
