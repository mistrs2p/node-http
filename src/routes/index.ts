import { IncomingMessage, ServerResponse } from "http";
import url from "url";

import { userRoutes } from "./userJson";
import { userMongoRoutes } from "./userMongo";
import { userMysqlRoutes } from "./userMysql";
import { routeHandler, allRoute } from "./handler";
import { getAllUser, createUser } from "../controllers/userControllerJson";
const router = (req: IncomingMessage, res: ServerResponse, data: any): void => {
  const parsedUrl = url.parse(req.url || "", true);
  const path = parsedUrl.pathname;

  routeHandler("POST", "/users/json", createUser);
  routeHandler("GET", "/users/json", getAllUser);

  routeHandler("POST", "/users/mysql", userRoutes);
  routeHandler("GET", "/users/mysql", userRoutes);

  routeHandler("POST", "/users/mongo", userRoutes);
  routeHandler("GET", "/users/mongo", userRoutes);

  const exist = allRoute.find((r) => r.url === req.url);
  if (!exist) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route Not Found" }));
  } else {
    console.log(allRoute);
  }
  // if (path === "/users/json") {
  //   userRoutes(req, res, data);
  // } else if (path === "/users/mongo") {
  //   userMongoRoutes(req, res, data);
  // } else if (path === "/users/mysql") {
  //   userMysqlRoutes(req, res, data);
  // } else {
  //   res.statusCode = 404;
  //   res.end(JSON.stringify({ message: "Route Not Found" }));
  // }
};

export default router;
