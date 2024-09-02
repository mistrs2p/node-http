import { IncomingMessage, ServerResponse } from "http";
import { getUser, createUser } from "../controllers/userController";
import {
  getUsersFromMongo,
  createUserInMongo,
} from "../services/userServiceMongo";

export const userMongoRoutes = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    if (req.method === "GET") {
      const users: any = await getUsersFromMongo();
      getUser(req, res, users);
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        try {
          const { name, email } = JSON.parse(body);
          const newUser = await createUserInMongo(name, email);
          createUser(req, res, newUser, null);
        } catch (err) {
          createUser(req, res, null, err);
        }
      });
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
