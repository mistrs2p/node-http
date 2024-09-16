import { IncomingMessage, ServerResponse } from "http";
import {
  readUsersFromFile,
  writeUsersToFile,
} from "../../../services/userServiceJson";
import { JsonResponse, Result, Response } from "../../../utils/Response";

const createUserJson = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>,
  data: any
): Promise<Response> => {
  console.log("createUser", data);
  const users = await readUsersFromFile();
  console.log(data);
  const { name, email } = data;
  const newUser = { name, email, id: 0 };
  newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push(newUser);
  await writeUsersToFile(users);
  return new JsonResponse({ body: newUser, statusCode: 201 });
};

export default createUserJson;
