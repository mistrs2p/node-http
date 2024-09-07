import { IncomingMessage, ServerResponse } from "node:http";

// import logger from "../middlewares/logger";
// import cors from "../middlewares/cors";
// import bodyHandler from "../middlewares/bodyHandler";

type NextFunction = (data?: any) => void;

type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => void;

// type ErrorHandler = (
//   err: any,
//   req: IncomingMessage,
//   res: ServerResponse
// ) => void;

// const middlewares: Middleware[] = [
//   cors,
//   logger,
//   bodyHandler,
// ];


const runMiddlewares = (req:IncomingMessage, res:ServerResponse, middlewares: Middleware[], callback: NextFunction) => {
  const run = (index: number, data?: any) => {
    if (index >= middlewares.length) {
      return callback(data); // After all middlewares, call the main route handler
    }
    
    middlewares[index](req, res, (result) => {
      run(index + 1, result); // Run the next middleware
    });
  };
  
  run(0); // Start running middlewares from the first one
};
export default runMiddlewares;
