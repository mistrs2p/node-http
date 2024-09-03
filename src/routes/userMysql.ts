import { IncomingMessage, ServerResponse } from "http";
import {
  userCreate,
  allUsersGet,
  userErr,
} from "../controllers/userController";
import { IUser } from "../models/UserMysql";
import {
  getUsersFromMysql,
  createUserInMysql,
} from "../services/userServiceMysql";
export const userMysqlRoutes = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  if (req.method === "GET") {
    try {
      const users = await getUsersFromMysql();
      allUsersGet(req, res, users as IUser[]);
    } catch (err) {
      userErr(req, res, err);
    }
  } else if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const { name, email } = JSON.parse(body) as IUser;
        const newUser = await createUserInMysql({ name, email });
        userCreate(req, res, newUser);
      } catch (err) {
        userErr(req, res, err);
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};
