import { IncomingMessage, ServerResponse } from "http";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import User from "../models/UserMongo"; // Use MongoDB for example

// Handle user registration
export const registerUser = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const { name, email, password } = JSON.parse(body);
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "User registered successfully" }));
    } catch (err) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({ message: "Error in user registration", error: err })
      );
    }
  });
};

// Handle user login
export const loginUser = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const { email, password } = JSON.parse(body);
      const user = await User.findOne({ email });

      if (!user) {
        res.statusCode = 401;
        res.end(JSON.stringify({ message: "Invalid credentials" }));
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.statusCode = 401;
        res.end(JSON.stringify({ message: "Invalid credentials" }));
        return;
      }

      const token = generateToken({ id: user._id, email: user.email });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ token }));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: "Error in user login", error: err }));
    }
  });
};
