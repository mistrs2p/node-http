import { IncomingMessage, ServerResponse } from "http";
import { getUser, createUser } from "../controllers/userController";
import { IUser } from "../models/UserMysql";
import mysqlDb from "../congfig/mysqlDb";

export const userMysqlRoutes = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  if (req.method === "GET") {
    const query = "SELECT * FROM users";
    const [users] = await mysqlDb.query(query);

    getUser(req, res, users as any);
  } else if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const { name, email } = JSON.parse(body) as IUser;

        const user: IUser = { name, email };
        const query = "INSERT INTO users (name, email) VALUES (?, ?)";
        try {
          const [results] = await mysqlDb.query(query, [user.name, user.email]);

          createUser(req, res, results, null);
        } catch (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Database error", error: err }));
        }
      } catch (err) {
        createUser(req, res, null, err);
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};
