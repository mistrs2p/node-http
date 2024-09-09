import { IncomingMessage, ServerResponse } from "http";

type Method = "GET" | "POST";

interface RouteHandler {
  method: Method;
  url: string;
  fn: (req: IncomingMessage, res: ServerResponse, data?: any) => void;
}

export const allRoute: RouteHandler[] = [];
export const routeHandler = (
  method: RouteHandler["method"],
  url: string,
  fn: RouteHandler["fn"],
): void => {
  allRoute.push({ method, url, fn });
};
