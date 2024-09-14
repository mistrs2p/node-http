import { IncomingMessage, ServerResponse } from "http";
import {
  getUsersFromMysql,
  createUserInMysql,
} from "../services/userServiceMysql";
import { sendResponse } from "../utils/responseClass";

export const getAllUserMysql = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
): Promise<{ message: any; statusCode: number }> => {
  const users = await getUsersFromMysql();
  return { message: users, statusCode: 200 };
};

export const createUserMysql = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  data: any,
): Promise<{ message: any; statusCode: number }> => {
  const { name, email } = data;
  const newUser = await createUserInMysql({ name, email });
  return { message: newUser, statusCode: 201 };
};
