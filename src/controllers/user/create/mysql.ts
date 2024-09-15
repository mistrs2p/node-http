import { IncomingMessage, ServerResponse } from "http";
import { createUserInMysql } from "../../../services/userServiceMysql";

const createUserMysql = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>,
  data: any
): Promise<{ message: any; statusCode: number }> => {
  const { name, email } = data;
  const newUser = await createUserInMysql({ name, email });
  return { message: newUser, statusCode: 201 };
};

export default createUserMysql;
