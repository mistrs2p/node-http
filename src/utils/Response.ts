import { IncomingMessage, ServerResponse } from "http";

export interface Result {
  body?: any;
  statusCode: number;
//   headers?: Record<string, string>;
}

interface Responsable {
  toResponse: (response: any) => void;
}

export class Response implements Responsable {
  readonly body: Result["body"];
  readonly statusCode: Result["statusCode"];
//   readonly headers: Result["headers"];
  constructor(result?: Result) {
    if (result !== undefined && "statusCode" in result) {
      this.statusCode = result.statusCode;
    } else {
      this.statusCode = 200;
    }
    // if (result !== undefined && "headers" in result) {
    //   this.headers = result.headers;
    // } else {
    // }
    if (result !== undefined && "body" in result) {
      this.body = result.body;
    } else {
      this.body = null;
    }
  }
  toResponse(response: ServerResponse): void {
    // response.headers(this.headers);
    response.statusCode = this.statusCode;
    response.end(this.body);
  }
}
/////////
export class JsonResponse extends Response {
  constructor(result: Result) {
    if (result === undefined) {
    //   result = { headers: {} };
    }
    // if (result.headers === undefined) {
    //   result.headers = {};
    // }
    result.body = JSON.stringify(result.body);
    // result.headers["content-type"] = "application/json";
    super(result);
  }
}
////////
export class ErrorResponse extends Error implements Responsable {
  toResponse(response: any): void {
    new JsonResponse({
      statusCode: 500,
      body: {
        isOk: false,
      },
    }).toResponse(response);
  }
}
