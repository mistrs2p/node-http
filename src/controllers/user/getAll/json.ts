import { IncomingMessage, ServerResponse } from "http";
import { readUsersFromFile } from "../../../services/userServiceJson";

const getAllUserJson = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>
): Promise<{ message: any; statusCode: number }> => {
  const users = await readUsersFromFile();
  return { message: users, statusCode: 200 };
};
export default getAllUserJson;
