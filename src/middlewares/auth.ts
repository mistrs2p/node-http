import { IncomingMessage, ServerResponse } from "http";
import { verifyToken } from "../utils/jwt";

const authMiddleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.statusCode = 401;
    res.end(JSON.stringify({ message: "Unauthorized: No token provided" }));
    return;
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    res.statusCode = 403;
    res.end(JSON.stringify({ message: "Forbidden: Invalid token" }));
  }
};

export default authMiddleware;
