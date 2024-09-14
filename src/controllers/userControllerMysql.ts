import { IncomingMessage, ServerResponse } from "http";
import {
  getUsersFromMysql,
  createUserInMysql,
} from "../services/userServiceMysql";
import { CustomResponse } from "../utils/responseClass";

export const getAllUserMysql = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const users = await getUsersFromMysql();
  new CustomResponse(req, res).handleResponse({ message: users }, 200);
};

export const createUserMysql = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  data: any
) => {
  const { name, email } = data;
  const newUser = await createUserInMysql({ name, email });
  new CustomResponse(req, res).handleResponse({ message: newUser }, 201);
};
