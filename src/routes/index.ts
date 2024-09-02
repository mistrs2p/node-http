import { IncomingMessage, ServerResponse } from "http";
import { userRoutes } from "./user";
import { userMongoRoutes } from "./userMongo";
import url from "url";
import { userMysqlRoutes } from "./userMysql";

export const router = (req: IncomingMessage, res: ServerResponse): void => {
  const parsedUrl = url.parse(req.url || "", true);
  const path = parsedUrl.pathname;
  if (path === "/users") {
    userRoutes(req, res);
  } else if (path === "/users/mongo") {
    userMongoRoutes(req, res);
  } else if (path === "/users/mysql") {
    userMysqlRoutes(req, res);
  }else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
};
