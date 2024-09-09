import { IncomingMessage, ServerResponse } from "http";
import {
  readUsersFromFile,
  writeUsersToFile,
} from "../services/userServiceJson";
import { getUser, userCreate } from "./userController";
export const getAllUserJson = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const users = readUsersFromFile();
  getUser(req, res, users);
};

export const createUserJson =async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  data: any
) => {
  console.log("createUser", data);
  const users = readUsersFromFile();
  console.log(data);
  const { name, email } = data;
  const newUser = { name, email, id: 0 };
  newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push(newUser);
  writeUsersToFile(users);
  userCreate(req, res, newUser);
};
