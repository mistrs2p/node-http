import { IncomingMessage, ServerResponse } from "http";
import { ErrorResponse } from "../utils/Response";

const errorMiddleware = (
  _err: unknown,
  _req: IncomingMessage,
  res: ServerResponse,
): void => {
  // let statusCode: number = res.statusCode ?? 500;

  // const data = {
  //   error: "",
  // };
  // if (err instanceof Error) {
  //   console.error(err.stack);
  //   data.error = err.message;
  // } else {
  //   console.log(err);
  //   data.error = "Internal Server Error";
  // }
  // new CustomResponse(req, res).handleResponse(data, statusCode);
  new ErrorResponse().toResponse(res)
};
export default errorMiddleware;
