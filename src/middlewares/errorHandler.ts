import { IncomingMessage, ServerResponse } from "http";

const errorHandler = (
  err: unknown,
  req: IncomingMessage,
  res: ServerResponse
): void => {
  if (err instanceof Error) {
    console.error(err.stack);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: err.message }));
  } else {
    // If the error is not an instance of Error, handle it as a generic error
    console.log(err)
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
};
export default errorHandler