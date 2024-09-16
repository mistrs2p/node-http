import { IncomingMessage, ServerResponse } from "http";
import { getUsersFromMongo } from "../../../services/userServiceMongo";
import { JsonResponse, Response } from "../../../utils/Response";

const getAllUserMongo = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>
): Promise<Response> => {
  const users = await getUsersFromMongo();
  return new JsonResponse({ body: users, statusCode: 200 });
};

export default getAllUserMongo;
