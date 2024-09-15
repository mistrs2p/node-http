import { IncomingMessage, ServerResponse } from "http";
import { createUserInMongo } from "../../../services/userServiceMongo";
import { Response, Result } from "../../../utils/Response";

const createUserMongo = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>,
  data: any
): Promise<Result> => {
  const { name, email } = data;
  const newUser = await createUserInMongo(name, email);
  return new Response({ body: newUser, statusCode: 201 });
};

export default createUserMongo;
