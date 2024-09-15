import { IncomingMessage, ServerResponse } from "http";
import { getUsersFromMysql } from "../../../services/userServiceMysql";

const getAllUserMysql = async (
  _req: IncomingMessage,
  _res: ServerResponse<IncomingMessage>
): Promise<{ message: any; statusCode: number }> => {
  const users = await getUsersFromMysql();
  return { message: users, statusCode: 200 };
};

export default getAllUserMysql;
