import { createServer } from "http";
import logger from "./middlewares/logger";
import cors from "./middlewares/cors";
import errorHandler from "./middlewares/errorHandler";
import methodHandler from "./middlewares/methodHandler";
import { router } from "./routes/index";

const PORT = process.env.PORT || 3001;

const server = createServer(async (req, res) => {
  let body = "";
  let data
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", async () => {
    data = JSON.parse(body);

    console.log("----------------------------------");
    console.log("body", (data));
    console.log("----------------------------------");
  });

  try {
    cors(req, res, () => {
      logger(req, res, () => {
        methodHandler(req, res, (data) => {
          router(req, res, data);
        });
      });
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
