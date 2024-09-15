import { IncomingMessage, ServerResponse } from "http";
import { sendResponse } from "../utils/responseClass";
import { ErrorResponse, JsonResponse, Result } from "../utils/Response";

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
) => Promise<Result>;

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
      new JsonResponse({ body: "Route Not Found", statusCode: 404 });
      return;
    }

    const result: Result = await route.handler(req, res, data);
    new JsonResponse(result).toResponse(result);
  } catch (error) {
    console.error("Error in route handling:", error);
    new ErrorResponse().toResponse(error);
    // sendResponse(req, res, { error: "Internal Server Error" }, 500);
  }
};

// const routes: Record<
//   string,
//   (
//     req: IncomingMessage,
//     res: ServerResponse,
//     data?: any,
//   ) => Promise<{ message: any; statusCode: number }>
// > = {
//   "POST /users/json": createUserJson,
//   "GET /users/json": getAllUserJson,

//   "POST /users/mysql": createUserMysql,
//   "GET /users/mysql": getAllUserMysql,

//   "POST /users/mongo": createUserMongo,
//   "GET /users/mongo": getAllUserMongo,
// };

// export const routeRequest = async (
//   req: IncomingMessage,
//   res: ServerResponse,
//   data?: any,
// ) => {
//   const method = req.method;
//   const url = req.url;

//   const routeKey = `${method} ${url}`;

//   const handler = routes[routeKey];

//   if (handler) {
//     const result = await handler(req, res, data);
//     sendResponse(req, res, result.message, result.statusCode);
//   } else {
//     sendResponse(req, res, { error: "Route Not Found" }, 404);
//   }
// };
