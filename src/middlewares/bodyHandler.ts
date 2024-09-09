import { IncomingMessage, ServerResponse } from "http";

const bodyHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (body?: any) => void,
) => {
  let body = "";
  let data: any;
  req.on("data", (chunk) => {
    console.log(chunk);
    body += chunk;
  });
  req.on("end", async () => {
    console.log("body", body);

    if (body) {
      data = JSON.parse(body);
      next(data);
    } else {
      next();
    }

    console.log("----------------------------------");
    console.log("Body chunks set: =>", data);
    console.log("----------------------------------");
  });
};

export default bodyHandler;
