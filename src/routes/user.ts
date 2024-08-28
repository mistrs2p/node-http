import { IncomingMessage, ServerResponse } from "http";
import { getUser, createUser } from "../controllers/userController";

export const userRoutes = (req: IncomingMessage, res: ServerResponse): void => {
  if (req.method === "GET" && req.url === "/users") {
    getUser(req, res);
  } else if (req.method === "POST" && req.url === "/users") {
    createUser(req, res);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};
