import { IncomingMessage, ServerResponse } from 'http';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Utility function to read users from the JSON file
const readUsersFromFile = (): any[] => {
  const filePath = join(__dirname, '../data/users.json');
  const data = readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Utility function to write users to the JSON file
const writeUsersToFile = (users: any[]): void => {
  const filePath = join(__dirname, '../data/users.json');
  writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
};

// Handle GET requests: Return the list of users
export const getUser = (req: IncomingMessage, res: ServerResponse): void => {
  const users = readUsersFromFile();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users));
};

// Handle POST requests: Add a new user
export const createUser = (req: IncomingMessage, res: ServerResponse): void => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const users = readUsersFromFile();
      const newUser = JSON.parse(body);
      newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
      users.push(newUser);

      writeUsersToFile(users);

      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(newUser));
    } catch (error) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Invalid JSON payload' }));
    }
  });
};