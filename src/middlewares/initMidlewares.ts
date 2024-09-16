import { IncomingMessage, ServerResponse } from "http";
import { DataArgs, MiddlewareList } from ".";
import { routeRequest } from "../routes";
import errorMiddleware from "./errorMiddleware";
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
          routeRequest(request, response, data);
        } else {
          initMiddleware(request, response, nextIndex, data);
        }
      } catch (err) {
        console.log(err);
        errorMiddleware(err, request, response);
      }
    },
    data
  );
};
