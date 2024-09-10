import { IncomingMessage, ServerResponse } from "http";

export class CustomResponse {
  protected readonly response: ServerResponse<IncomingMessage>;
  protected readonly request: IncomingMessage;
  constructor(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    this.request = req;
    this.response = res;
  }

  // Method to send a success response
  success(data = {}, message = 'Request was successful', statusCode = 200) {
    this.response.statusCode = statusCode;
    this.response.setHeader('Content-Type', 'application/json');
    this.response.end(
      JSON.stringify({
        status: 'success',
        message,
        data,
      })
    );
  }

  // Method to send an error response
  error(message = 'An error occurred', statusCode = 500, data = {}) {
    this.response.statusCode = statusCode;
    this.response.setHeader('Content-Type', 'application/json');
    this.response.end(
      JSON.stringify({
        status: 'error',
        message,
        data,
      })
    );
  }

  // Method to send a not found response
  notFound(message = 'Resource not found') {
    this.error(message, 404);
  }

  // Method to send a custom response
  custom(data = {}, statusCode = 200) {
    this.response.statusCode = statusCode;
    this.response.setHeader('Content-Type', 'application/json');
    this.response.end(JSON.stringify(data));
  }
}
