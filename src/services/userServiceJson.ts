import { join } from "path";
import { readFile, writeFile } from "fs/promises";

// Utility function to read users from the JSON file
export const readUsersFromFile = async (): Promise<any> => {
  const filePath = join(__dirname, "../data/users.json");
  const data = await readFile(filePath, "utf8");
  return JSON.parse(data);
};

// Utility function to write users to the JSON file
export const writeUsersToFile = async (users: any[]): Promise<void> => {
  const filePath = join(__dirname, "../data/users.json");
  await writeFile(filePath, JSON.stringify(users, null, 2), "utf8");
};
