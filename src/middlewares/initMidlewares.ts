import { IncomingMessage, ServerResponse } from "http";
import { DataArgs, MiddlewareList } from ".";
import { routeRequest } from "../routes";
import errorMiddleware from "./errorMiddleware";
import { ErrorResponse } from "../utils/Response";
export const initMiddleware = (
  request: IncomingMessage,
  response: ServerResponse,
  current: number = 0,
  data?: DataArgs
): void => {
  data = data ?? {
    body: undefined,
    query: {},
  };
  MiddlewareList[current](
    request,
    response,
    (_data?: DataArgs) => {
      if (_data !== undefined) {
        data = _data;
      }
      const nextIndex = ++current;
      try {
        if (MiddlewareList[nextIndex] === undefined) {
          routeRequest(request, response, data)
            .then((result) => {
              result.toResponse(response);
            })
            .catch((err) => {
              error(err, request, response);
            });
        } else {
          initMiddleware(request, response, nextIndex, data);
        }
      } catch (err) {
        console.log(err);
        error(err, request, response);
      }
    },
    data
  );
};

function error(
  err: any,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  if (err instanceof ErrorResponse) {
    err.toResponse(res);
  } else {
    errorMiddleware(err, req, res);
  }
}
