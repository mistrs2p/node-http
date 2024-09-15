import { IncomingMessage, ServerResponse } from "http";
import { readUsersFromFile } from "../../../services/userServiceJson";
import { Response, Result } from "../../../utils/Response";

const getAllUserJson = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>
): Promise<Result> => {
  const users = await readUsersFromFile();
  return new Response({ body: users, statusCode: 200 });
};
export default getAllUserJson;
