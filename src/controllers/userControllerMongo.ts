import { IncomingMessage, ServerResponse } from "http";
import {
  getUsersFromMongo,
  createUserInMongo,
} from "../services/userServiceMongo";
import { sendResponse } from "../utils/responseClass";

export const getAllUserMongo = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const users = await getUsersFromMongo();
  return { message: users, statusCode: 200 }
};

export const createUserMongo = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  data: any
) => {
  const { name, email } = data;
  const newUser = await createUserInMongo(name, email);
  return { message: newUser, statusCode: 201 }

};
