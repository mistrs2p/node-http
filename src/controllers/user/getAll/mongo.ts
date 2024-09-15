import { IncomingMessage, ServerResponse } from "http";
import { getUsersFromMongo } from "../../../services/userServiceMongo";
import { Response, Result } from "../../../utils/Response";

const getAllUserMongo = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>
): Promise<Result> => {
  const users = await getUsersFromMongo();
  return new Response({ body: users, statusCode: 200 });
};

export default getAllUserMongo;
