import { IncomingMessage, ServerResponse } from "node:http";

const loggerMiddleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
): void => {
  const { method, url } = req;
  const now = new Date().toISOString();
  console.log(`__________________________________________________`);
  console.log(`[${now}] ${method} ${url}`);
  console.log(`User Agent: ${req.headers["user-agent"]}`);
  console.log(`__________________________________________________`);

  next();
};

export default loggerMiddleware;
