import { IncomingMessage, ServerResponse } from "http";

const bodyHandler = (req: IncomingMessage, res: ServerResponse, next: (body: any) => void) => {
  let body = "";
  let data;
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", async () => {
    data = JSON.parse(body);
    next(body);

    console.log("----------------------------------");
    console.log("body Done: =>", data);
    console.log("----------------------------------");
  });
};

export default bodyHandler;
