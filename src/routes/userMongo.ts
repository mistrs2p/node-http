import { IncomingMessage, ServerResponse } from "http";
import {
  allUsersGet,
  userCreate,
} from "../controllers/userController";

export const userMongoRoutes = async (
  req: IncomingMessage,
  res: ServerResponse,
  data: any
): Promise<void> => {
  try {
    if (req.method === "GET") {
      allUsersGet(req, res, data);
    } else if (req.method === "POST") {
      userCreate(req, res, data);
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Not Found" }));
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
};
