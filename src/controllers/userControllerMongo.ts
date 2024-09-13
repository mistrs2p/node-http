import { IncomingMessage, ServerResponse } from "http";
import {
  getUsersFromMongo,
  createUserInMongo,
} from "../services/userServiceMongo";
import { getUser, userCreate } from "./userController";
import { CustomResponse } from "../utils/responseClass";

export const getAllUserMongo = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => {
  const users = await getUsersFromMongo();
  getUser(req, res, users);
};

export const createUserMongo = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  data: any,
) => {
  const { name, email } = data;
  const newUser = await createUserInMongo(name, email);
  new CustomResponse(req, res).handleResponse({ message: newUser }, 201);
};
