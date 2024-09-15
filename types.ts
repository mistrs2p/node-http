interface Result {
  body?: any;
  status?: number;
  headers?: Record<string, string>;
}
interface Responsable {
  toResponse: (response: any) => void;
}