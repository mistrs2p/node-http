import { IUser } from "../models/UserMysql";
import mysqlDb from "../congfig/mysqlDb";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const getUsersFromMysql = async (): Promise<IUser[]> => {
  const query = "SELECT * FROM users";
  const [users] = await mysqlDb.query<RowDataPacket[]>(query);
  return users as IUser[];
};
export const createUserInMysql = async ({
  name,
  email,
}: IUser): Promise<IUser> => {
  if (!name || !email) {
    throw new Error("Invalid input: 'name' and 'email' are required.");
  }
  const query = "INSERT INTO users (name, email) VALUES (?, ?)";

  try {
    const [results] = await mysqlDb.query<ResultSetHeader>(query, [
      name,
      email,
    ]);

    const user: IUser = { id: results.insertId, name, email };
    return user;
  } catch (err) {
    console.error("Error executing query:", err);
    throw new Error("Failed to create user in the database.");
  }
};
