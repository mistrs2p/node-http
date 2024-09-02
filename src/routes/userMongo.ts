import { IncomingMessage, ServerResponse } from "http";
import { getUser, createUser } from "../controllers/userController";
import User from "../models/UserMongo";
export const userMongoRoutes = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  if (req.method === "GET") {
    const users = await User.find({});
    getUser(req, res, users);
  } else if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const { name, email } = JSON.parse(body);
        const newUser = new User({ name, email });
        await newUser.save();
        createUser(req, res, newUser, null);
      } catch (err) {
        createUser(req, res, null, err);
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};
