import { IncomingMessage, ServerResponse } from "http";
import { getUser, userCreate } from "../controllers/userController";
import {
  readUsersFromFile,
  writeUsersToFile,
} from "../services/userServiceJson";
export const userRoutes = (
  req: IncomingMessage,
  res: ServerResponse,
  data: any,
): void => {
  if (req.method === "GET") {
    getUser(req, res, data);
  } else if (req.method === "POST") {
    const users = readUsersFromFile();
    const newUser = JSON.parse(data);
    newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push(newUser);
    writeUsersToFile(users);
    userCreate(req, res, newUser);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};
