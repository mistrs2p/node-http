import { createServer } from "http";
import logger from "./middlewares/logger";
import errorHandler from "./middlewares/errorHandler";
import { router } from "./routes/index";
import run from "./congfig/mongoDb";

run();

const server = createServer(async (req, res) => {
  try {
    logger(req, res, () => {
      router(req, res);
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
