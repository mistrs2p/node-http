import { IncomingMessage, ServerResponse } from "http";
import { getUser, createUser } from "../controllers/userController";
import { readUsersFromFile, writeUsersToFile } from "../storage";

export const userRoutes = (req: IncomingMessage, res: ServerResponse): void => {
  if (req.method === "GET") {
    const users = readUsersFromFile();
    getUser(req, res, users);
  } else if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const users = readUsersFromFile();
        const newUser = JSON.parse(body);
        newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
        users.push(newUser);
        writeUsersToFile(users);

        createUser(req, res, newUser, null);
      } catch (err) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Invalid JSON payload" }));
        createUser(req, res, null, err);
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};
