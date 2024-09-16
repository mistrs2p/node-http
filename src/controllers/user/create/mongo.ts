import { IncomingMessage, ServerResponse } from "http";
import { createUserInMongo } from "../../../services/userServiceMongo";
import { JsonResponse, Response } from "../../../utils/Response";

const createUserMongo = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>,
  data: any
): Promise<Response> => {
  const { name, email } = data;
  const newUser = await createUserInMongo(name, email);
  return new JsonResponse({ body: newUser, statusCode: 201 });
};

export default createUserMongo;
