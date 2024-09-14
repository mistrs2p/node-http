import { IncomingMessage, ServerResponse } from "http";
import {
  readUsersFromFile,
  writeUsersToFile,
} from "../services/userServiceJson";
import { CustomResponse } from "../utils/responseClass";

export const getAllUserJson = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const users = readUsersFromFile();
  new CustomResponse(req, res).handleResponse({ message: users }, 200);
};

export const createUserJson = async (
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
  new CustomResponse(req, res).handleResponse({ message: newUser }, 201);
};
