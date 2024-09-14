import { IncomingMessage, ServerResponse } from "http";
import {
  readUsersFromFile,
  writeUsersToFile,
} from "../services/userServiceJson";
import { sendResponse } from "../utils/responseClass";

export const getAllUserJson = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
): Promise<{ message: any; statusCode: number }> => {
  const users = await readUsersFromFile();
  return { message: users, statusCode: 200 };
};

export const createUserJson = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  data: any,
): Promise<{ message: any; statusCode: number }> => {
  console.log("createUser", data);
  const users = await readUsersFromFile();
  console.log(data);
  const { name, email } = data;
  const newUser = { name, email, id: 0 };
  newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push(newUser);
  await writeUsersToFile(users);
  return { message: newUser, statusCode: 201 };
};
