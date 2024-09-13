import { IncomingMessage, ServerResponse } from "http";
import { CustomResponse } from "../utils/responseClass";

const errorHandler = (
  err: unknown,
  _req: IncomingMessage,
  res: ServerResponse,
): void => {
  let statusCode: number = res.statusCode || 500;

  const data = {
    error: "",
  };
  if (err instanceof Error) {
    console.error(err.stack);
    data.error = err.message;
  } else {
    console.log(err);
    data.error = "Internal Server Error";
  }
  new CustomResponse(_req, res).handleResponse(data, statusCode);
};
export default errorHandler;
