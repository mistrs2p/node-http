import { IncomingMessage, ServerResponse } from "http";
import {
  getUsersFromMongo,
  createUserInMongo,
} from "../services/userServiceMongo";
import { sendResponse } from "../utils/responseClass";

export const getAllUserMongo = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
): Promise<{ message: any; statusCode: number }> => {
  const users = await getUsersFromMongo();
  return { message: users, statusCode: 200 };
};

export const createUserMongo = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  data: any,
): Promise<{ message: any; statusCode: number }> => {
  const { name, email } = data;
  const newUser = await createUserInMongo(name, email);
  return { message: newUser, statusCode: 201 };
};
