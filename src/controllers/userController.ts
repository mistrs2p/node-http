import { IncomingMessage, ServerResponse } from "http";
import { IUser } from "../models/UserMysql";

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

export const userCreate = (
  req: IncomingMessage,
  res: ServerResponse,
  user: IUser
) => {
  res.statusCode = 201;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(user));
};

export const allUsersGet = (
  req: IncomingMessage,
  res: ServerResponse,
  users: IUser[]
) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(users));
};

export const userErr = (
  req: IncomingMessage,
  res: ServerResponse,
  err: Error | unknown
) => {
  let message: string;
  if (err instanceof Error) {
    console.error(err.stack);
    res.statusCode = 400;
    message = err.message;
  } else {
    console.error(err);
    message = "Internal Server Error";
    res.statusCode = 500;
  }
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message }));
};
