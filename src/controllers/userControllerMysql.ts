import { IncomingMessage, ServerResponse } from "http";
import {
  getUsersFromMysql,
  createUserInMysql,
} from "../services/userServiceMysql";
import { getUser, userCreate } from "./userController";
import { CustomResponse } from "../utils/responseClass";

export const getAllUserMysql = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => {
  const users = await getUsersFromMysql();
  getUser(req, res, users);
};

export const createUserMysql = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  data: any,
) => {
  const { name, email } = data;
  const newUser = await createUserInMysql({ name, email });
  new CustomResponse(req, res).handleResponse({ message: newUser }, 201);
};
