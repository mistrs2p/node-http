import { IncomingMessage, ServerResponse } from "http";
import {
  getUsersFromMongo,
  createUserInMongo,
} from "../services/userServiceMongo";
import { CustomResponse } from "../utils/responseClass";

export const getAllUserMongo = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const users = await getUsersFromMongo();
  new CustomResponse(req, res).handleResponse({ message: users }, 200);
};

export const createUserMongo = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  data: any
) => {
  const { name, email } = data;
  const newUser = await createUserInMongo(name, email);
  new CustomResponse(req, res).handleResponse({ message: newUser }, 201);
};
