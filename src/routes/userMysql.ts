import { IncomingMessage, ServerResponse } from "http";
import { userCreate, allUsersGet } from "../controllers/userController";
import { IUser } from "../models/UserMysql";
export const userMysqlRoutes = async (
  req: IncomingMessage,
  res: ServerResponse,
  data: any
): Promise<void> => {
  if (req.method === "GET") {
    allUsersGet(req, res, data as IUser[]);
  } else if (req.method === "POST") {
    userCreate(req, res, data);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};
