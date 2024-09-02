import { IncomingMessage, ServerResponse } from "http";

const errorHandler = (
  err: unknown,
  _req: IncomingMessage,
  res: ServerResponse
): void => {
  let statusCode: number = res.statusCode || 500;
  let message: string;
  if (err instanceof Error) {
    console.error(err.stack);
    message = err.message;
  } else {
    console.log(err);
    statusCode = res.statusCode;
    message = "Internal Server Error";
  }
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message }));
};
export default errorHandler;
