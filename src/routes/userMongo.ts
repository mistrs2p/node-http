import { IncomingMessage, ServerResponse } from "http";
import { allUsersGet, userCreate } from "../controllers/userController";
import {
  createUserInMongo,
  getUsersFromMongo,
} from "../services/userServiceMongo";

export const userMongoRoutes = async (
  req: IncomingMessage,
  res: ServerResponse,
  data: any
): Promise<void> => {
  try {
    // const parsedData = JSON.parse(data);
    if (req.method === "GET") {
      const users = await getUsersFromMongo();
      allUsersGet(req, res, users);
    } else if (req.method === "POST") {
      const { name, email } = data;
      const newUser = await createUserInMongo(name, email);
      userCreate(req, res, newUser);
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
