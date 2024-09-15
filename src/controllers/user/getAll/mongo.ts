import { IncomingMessage, ServerResponse } from "http";
import { getUsersFromMongo } from "../../../services/userServiceMongo";

const getAllUserMongo = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>
): Promise<{ message: any; statusCode: number }> => {
  const users = await getUsersFromMongo();
  return { message: users, statusCode: 200 };
};

export default getAllUserMongo;
