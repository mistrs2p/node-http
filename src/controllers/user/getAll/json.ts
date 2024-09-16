import { IncomingMessage, ServerResponse } from "http";
import { readUsersFromFile } from "../../../services/userServiceJson";
import { JsonResponse, Response } from "../../../utils/Response";

const getAllUserJson = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>
): Promise<Response> => {
  const users = await readUsersFromFile();
  return new JsonResponse({ body: users, statusCode: 200 });
};
export default getAllUserJson;
