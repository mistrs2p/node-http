import User from "../models/UserMongo";
import run from "../congfig/mongoDb";

export const getUsersFromMongo = async () => {
  await run();
  const users = await User.find({});
  return users;
};

export const createUserInMongo = async (name: string, email: string) => {
  await run();
  const newUser = new User({ name, email });
  await newUser.save();
  return newUser;
};
