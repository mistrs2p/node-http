import { IncomingMessage, ServerResponse } from "http";
import { CustomResponse, sendResponse } from "../utils/responseClass";

import {
  getAllUserJson,
  createUserJson,
} from "../controllers/userControllerJson";
import {
  getAllUserMysql,
  createUserMysql,
} from "../controllers/userControllerMysql";
import {
  getAllUserMongo,
  createUserMongo,
} from "../controllers/userControllerMongo";

const routes: Record<
  string,
  (req: IncomingMessage, res: ServerResponse, data?: any) => void
> = {
  "POST /users/json": createUserJson,
  "GET /users/json": getAllUserJson,

  "POST /users/mysql": createUserMysql,
  "GET /users/mysql": getAllUserMysql,

  "POST /users/mongo": createUserMongo,
  "GET /users/mongo": getAllUserMongo,
};

export const routeRequest = (
  req: IncomingMessage,
  res: ServerResponse,
  data?: any
) => {
  const method = req.method;
  const url = req.url;

  const routeKey = `${method} ${url}`;

  const handler = routes[routeKey];

  if (handler) {
    const result = handler(req, res, data);
    sendResponse(req, res, result.message, result.statusCode);
  } else {
    sendResponse(req, res, { error: "Route Not Found" }, 404);
  }
};
