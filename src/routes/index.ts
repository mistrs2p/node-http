import { IncomingMessage, ServerResponse } from "http";
import { userRoutes } from "./user";
import url from "url";

export const router = (req: IncomingMessage, res: ServerResponse): void => {
  const parsedUrl = url.parse(req.url || "", true);
  const path = parsedUrl.pathname;
  if (path === "/users") {
    userRoutes(req, res);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
};
