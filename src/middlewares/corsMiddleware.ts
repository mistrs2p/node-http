import { IncomingMessage, ServerResponse } from "http";

const corsMiddleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
  console.log("CorsMiddleware");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};

export default corsMiddleware;
