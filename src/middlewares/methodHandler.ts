import { IncomingMessage, ServerResponse } from "http";
import {
  getUsersFromMongo,
  createUserInMongo,
} from "../services/userServiceMongo";

import {
  createUserInMysql,
  getUsersFromMysql,
} from "../services/userServiceMysql";
import { userErr } from "../controllers/userController";
import {
  readUsersFromFile,
  writeUsersToFile,
} from "../services/userServiceJson";

const methodHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  next: (data: any) => void
): Promise<void> => {
  const { method, url } = req;

  if (method === "GET") {
    let users: any;
    if (url === "/users/mongo") {
      users = await getUsersFromMongo();
    } else if (url === "/users/mysql") {
      users = await getUsersFromMysql();
    } else if (url === "/users/json") {
      users = readUsersFromFile();
    }
    next(users);
    console.log(url);
  } else if (method === "POST") {
    console.log("POST", url);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const { name, email } = JSON.parse(body);
        let newUser;
        if (url === "/users/mongo") {
          newUser = await createUserInMongo(name, email);
        } else if (url === "/users/mysql") {
          newUser = await createUserInMysql({ name, email });
        } else if (url === "/users/json") {
          const users = readUsersFromFile();
          newUser = JSON.parse(body);
          newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
          users.push(newUser);
          writeUsersToFile(users);
        }
        next(newUser);
      } catch (err) {
        userErr(req, res, err);
      }
    });
  }
};

export default methodHandler;
