import { IncomingMessage, ServerResponse } from "http";
import url from "url";

import { userRoutes } from "./userJson";
import { userMongoRoutes } from "./userMongo";
import { userMysqlRoutes } from "./userMysql";

const router = (
  req: IncomingMessage,
  res: ServerResponse,
  data: any
): void => {
  const parsedUrl = url.parse(req.url || "", true);
  const path = parsedUrl.pathname;
  if (path === "/users/json") {
    userRoutes(req, res, data);
  } else if (path === "/users/mongo") {
    userMongoRoutes(req, res, data);
  } else if (path === "/users/mysql") {
    userMysqlRoutes(req, res, data);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
};

export default router;