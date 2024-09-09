import { IncomingMessage, ServerResponse } from "http";

const bodyHandler = (
  req: IncomingMessage,
  _res: ServerResponse,
  next: (data?: any) => void
): void => {
  let body = "";
  let data: any;
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    data = JSON.parse(body);
    next(data);
  });
};

export default bodyHandler;
