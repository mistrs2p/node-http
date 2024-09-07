import { IncomingMessage, ServerResponse } from "http";
import { userCreate, allUsersGet } from "../controllers/userController";
import { IUser } from "../models/UserMysql";
import {
  createUserInMysql,
  getUsersFromMysql,
} from "../services/userServiceMysql";
export const userMysqlRoutes = async (
  req: IncomingMessage,
  res: ServerResponse,
  data: any
): Promise<void> => {
  console.log("datadatadatadata", data);
  if (req.method === "GET") {
    const users = await getUsersFromMysql();

    allUsersGet(req, res, users as IUser[]);
  } else if (req.method === "POST") {
    const newUser = await createUserInMysql({
      name: data.name,
      email: data.email,
    });
    userCreate(req, res, newUser);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};
