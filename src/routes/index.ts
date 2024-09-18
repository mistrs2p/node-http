import { IncomingMessage, ServerResponse } from "http";
import { ErrorResponse, Response, Result } from "../utils/Response";

import getAllUserJson from "../controllers/user/getAll/json";
import createUserJson from "../controllers/user/create/json";

import getAllUserMongo from "../controllers/user/getAll/mongo";
import createUserMongo from "../controllers/user/create/mongo";

import getAllUserMysql from "../controllers/user/getAll/mysql";
import createUserMysql from "../controllers/user/create/mysql";

type RouteHandler = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  data?: any
) => Promise<Response>;

type Route = {
  method: string;
  url: string;
  handler: RouteHandler;
};

const routes: Route[] = [];

const registerRoute = (method: string, url: string, handler: RouteHandler) => {
  routes.push({
    method: method.toUpperCase(),
    url: url.replace(/\/+$/, ""),
    handler,
  });
};

registerRoute("POST", "/users/json", createUserJson);
registerRoute("GET", "/users/json", getAllUserJson);

registerRoute("POST", "/users/mongo", createUserMongo);
registerRoute("GET", "/users/mongo", getAllUserMongo);

registerRoute("POST", "/users/mysql", createUserMysql);
registerRoute("GET", "/users/mysql", getAllUserMysql);

export const routeRequest = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  data?: any
): Promise<Result | undefined> => {
  try {
    const { method = "", url = "" } = req;

    const normalizedMethod = method.toUpperCase();
    const normalizedUrl = url.replace(/\/+$/, "");

    const route = routes.find(
      (r) => r.method === normalizedMethod && r.url === normalizedUrl
    );

    if (!route) {
      new ErrorResponse(404, {message: "Route Not Found!", isOk: false}).toResponse(res);
      return;
    }

    const result = await route.handler(req, res, data);
    result.toResponse(res);
  } catch (error) {
    console.error("Error in route handling:", res);
    new ErrorResponse().toResponse(res);
  }
};
