import { IncomingMessage, ServerResponse } from "http";

// Handle GET requests: Return the list of users
export const getUser = (
  req: IncomingMessage,
  res: ServerResponse,
  users: any[]
): void => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(users));
};

// Handle POST requests: Add a new user
export const createUser = (
  req: IncomingMessage,
  res: ServerResponse,
  newUser: any,
  err: unknown
): void => {
  if (err) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");

    if (err instanceof Error) {
      console.log(err.stack);
      res.end(JSON.stringify({ message: err }));
    } else {
      res.end(JSON.stringify({ message: "Invalid JSON payload" }));
    }
  } else {
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(newUser));
  }
};
