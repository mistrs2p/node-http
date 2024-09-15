interface Result {
  body?: any;
  status?: number;
  headers?: Record<string, string>;
}
interface Responsable {
  toResponse: (response: any) => void;
}

export class Response implements Responsable {
  readonly body: Result["body"];
  readonly status: Result["status"];
  readonly headers: Result["headers"];
  constructor(result?: Result) {
    if (result !== undefined && "status" in result) {
      this.status = result.status;
    } else {
      this.status = 200;
    }
    if (result !== undefined && "headers" in result) {
      this.headers = result.headers;
    } else {
    }
    if (result !== undefined && "body" in result) {
      this.body = result.body;
    } else {
      this.body = null;
    }
  }
  toResponse(response: any): void {
    response.headers(this.headers);
    response.status(this.status);
    response.end(this.body);
  }
}
/////////
class JsonResponse extends Response {
  constructor(result: Result) {
    if (result === undefined) {
      result = { headers: {} };
    }
    if (result.headers === undefined) {
      result.headers = {};
    }
    result.body = JSON.stringify(result.body);
    result.headers["content-type"] = "json";
    super(result);
  }
}
////////
class ErrorResponse extends Error implements Responsable {
  toResponse(response: any): void {
    new JsonResponse({
      status: 500,
      body: {
        isOk: false,
      },
    }).toResponse(response);
  }
}
