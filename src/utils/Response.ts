import { IncomingMessage, ServerResponse } from "http";

export interface Result {
  body?: any;
  statusCode?: number;
  headers?: Record<string, string>;
}

interface Responsable {
  toResponse: (response: ServerResponse) => void;
}

export class Response implements Responsable {
  readonly body: Result["body"];
  readonly statusCode: Result["statusCode"];
  readonly headers: Result["headers"];
  constructor(result?: Result) {
    if (result !== undefined && "statusCode" in result) {
      this.statusCode = result.statusCode;
    } else {
      this.statusCode = 200;
    }
    if (result !== undefined && "headers" in result) {
      console.log(result);
      this.headers = result.headers;
    } else {
      this.headers = {};
    }
    if (result !== undefined && "body" in result) {
      this.body = result.body;
    } else {
      this.body = null;
    }
  }
  toResponse(response: ServerResponse): void {
    for (let k in this.headers) {
      console.log(this.headers[k]);
      console.log(k);
      // if (this.headers.hasOwnProperty(k) && this.headers[k] !== undefined) {
      //   response.setHeader(k, this.headers[k]!);
      // }
    }
    response.statusCode = this.statusCode!;
    response.end(this.body);
  }
}
/////////
export class JsonResponse extends Response {
  constructor(result: Result) {
    if (result === undefined) {
      result = { headers: {} };
    }
    if (result.headers === undefined) {
      result.headers = {};
    }
    result.body = JSON.stringify(result.body);
    result.headers["content-type"] = "application/json";
    super(result);
  }
}
////////
export class ErrorResponse extends Error implements Responsable {
  constructor(
    private statusCode: number = 500,
    private body: any = { error: "Internal Server Error" }
  ) {
    super();
  }
  toResponse(response: ServerResponse<IncomingMessage>): void {
    new JsonResponse({
      statusCode: this.statusCode,
      body: this.body,
    }).toResponse(response);
  }
}
