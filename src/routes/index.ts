import { IncomingMessage, ServerResponse } from "http";
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
    handler(req, res, data);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
};
