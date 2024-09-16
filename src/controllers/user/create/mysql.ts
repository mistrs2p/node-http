import { IncomingMessage, ServerResponse } from "http";
import { createUserInMysql } from "../../../services/userServiceMysql";
import { JsonResponse, Response } from "../../../utils/Response";

const createUserMysql = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>,
  data: any
): Promise<Response> => {
  const { name, email } = data;
  const newUser = await createUserInMysql({ name, email });
  return new JsonResponse({ body: newUser, statusCode: 201 });
};

export default createUserMysql;
