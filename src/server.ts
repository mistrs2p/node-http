import { createServer, IncomingMessage, ServerResponse } from "http";
import { initMiddleware } from "./middlewares/initMidlewares";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;

const server = createServer(
  async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    initMiddleware(req, res);
  }
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
