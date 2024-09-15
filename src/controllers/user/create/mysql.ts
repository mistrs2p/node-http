import { IncomingMessage, ServerResponse } from "http";
import { createUserInMysql } from "../../../services/userServiceMysql";
import { Response, Result } from "../../../utils/Response";

const createUserMysql = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>,
  data: any
): Promise<Result> => {
  const { name, email } = data;
  const newUser = await createUserInMysql({ name, email });
  return new Response({ body: newUser, statusCode: 201 });
};

export default createUserMysql;
