import { IncomingMessage, ServerResponse } from "http";
interface ResponseData {
  message?: string | object;
  error?: Error | unknown;
}

class JsonRespone {
  protected readonly response: ServerResponse<IncomingMessage>;
  constructor(res: ServerResponse<IncomingMessage>) {
    this.response = res;
    this.response.setHeader("Content-Type", "application/json");
  }
}

export class CustomResponse extends JsonRespone {
  protected readonly request: IncomingMessage;
  constructor(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    super(res);
    this.request = req;
  }
  handleResponse(data: ResponseData, statusCode: number = 200) {
    this.response.statusCode = statusCode;
    this.response.end(JSON.stringify(data));
  }
}
