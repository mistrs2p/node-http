import { IncomingMessage, ServerResponse } from "http";
import { getUsersFromMysql } from "../../../services/userServiceMysql";
import { JsonResponse, Response } from "../../../utils/Response";

const getAllUserMysql = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>
): Promise<Response> => {
  const users = await getUsersFromMysql();
  return new JsonResponse({ body: users, statusCode: 200 });
};

export default getAllUserMysql;
