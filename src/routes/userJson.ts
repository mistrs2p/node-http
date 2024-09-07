import { IncomingMessage, ServerResponse } from "http";
import { getUser, userCreate } from "../controllers/userController";
export const userRoutes = (
  req: IncomingMessage,
  res: ServerResponse,
  data: any
): void => {
  if (req.method === "GET") {
    getUser(req, res, data);
  } else if (req.method === "POST") {
    userCreate(req, res, data);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};
