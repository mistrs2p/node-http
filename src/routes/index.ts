import { IncomingMessage, ServerResponse } from "http";
import { userRoutes } from "./user";

export const router = (req: IncomingMessage, res: ServerResponse): void => {
  if (req.url?.startsWith("/users")) {
    userRoutes(req, res);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
};
