import { IncomingMessage, ServerResponse } from "http";
import {
  getUsersFromMysql,
  createUserInMysql,
} from "../services/userServiceMysql";
import { sendResponse } from "../utils/responseClass";

export const getAllUserMysql = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const users = await getUsersFromMysql();
  return { message: users, statusCode: 200 };
};

export const createUserMysql = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  data: any
) => {
  const { name, email } = data;
  const newUser = await createUserInMysql({ name, email });
  return { message: newUser, statusCode: 201 };
};
