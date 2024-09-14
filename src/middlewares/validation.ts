import { IncomingMessage, ServerResponse } from "http";
import { CustomResponse } from "../utils/responseClass";

const validateUserData = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (dataNext?: any) => void,
  data?: any
): void => {
  // const { name, email } = data || {};
  console.log("validation Data", next(data))
  // if (
  //   !name ||
  //   typeof name !== "string" ||
  //   !email ||
  //   typeof email !== "string"
  // ) {
  //   return new CustomResponse(req, res).handleResponse(
  //     {
  //       error:
  //         "Invalid input: 'name' and 'email' are required and must be valid strings.",
  //     },
  //     400
  //   );
  // }

  next(data);
};

export default validateUserData;
