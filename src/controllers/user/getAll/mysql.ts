import { IncomingMessage, ServerResponse } from "http";
import { getUsersFromMysql } from "../../../services/userServiceMysql";
import { Response, Result } from "../../../utils/Response";

const getAllUserMysql = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>
): Promise<Result> => {
  const users = await getUsersFromMysql();
  return new Response({ body: users, statusCode: 200 });
};

export default getAllUserMysql;
