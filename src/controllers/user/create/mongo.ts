import { IncomingMessage, ServerResponse } from "http";
import { createUserInMongo } from "../../../services/userServiceMongo";

const createUserMongo = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>,
  data: any
): Promise<{ message: any; statusCode: number }> => {
  const { name, email } = data;
  const newUser = await createUserInMongo(name, email);
  return { message: newUser, statusCode: 201 };
};

export default createUserMongo;
