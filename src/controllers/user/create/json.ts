import { IncomingMessage, ServerResponse } from "http";
import {
  readUsersFromFile,
  writeUsersToFile,
} from "../../../services/userServiceJson";
import { Response, Result } from "../../../utils/Response";

const createUserJson = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>,
  data: any
): Promise<Result> => {
  console.log("createUser", data);
  const users = await readUsersFromFile();
  console.log(data);
  const { name, email } = data;
  const newUser = { name, email, id: 0 };
  newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push(newUser);
  await writeUsersToFile(users);
  return new Response({ body: newUser, statusCode: 201 });
};

export default createUserJson;
