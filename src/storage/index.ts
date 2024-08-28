import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

// Utility function to read users from the JSON file
export const readUsersFromFile = (): any[] => {
  const filePath = join(__dirname, "../data/users.json");
  const data = readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

// Utility function to write users to the JSON file
export const writeUsersToFile = (users: any[]): void => {
  const filePath = join(__dirname, "../data/users.json");
  writeFileSync(filePath, JSON.stringify(users, null, 2), "utf8");
};

