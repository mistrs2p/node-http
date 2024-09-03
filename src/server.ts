import { createServer } from "http";
import logger from "./middlewares/logger";
import cors from "./middlewares/cors";
import errorHandler from "./middlewares/errorHandler";
import { router } from "./routes/index";

const PORT = process.env.PORT || 3001;

const server = createServer(async (req, res) => {
  try {
    cors(req, res, () => {
      logger(req, res, () => {
        router(req, res);
      });
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
