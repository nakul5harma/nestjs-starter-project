export class ResponseModel {
  data: object[] | object | string;
  code: string;
  message: string;

  constructor(data: object | object[] | string, code: string, message?: string) {
    this.code = code;
    this.message = message || null;
    this.data = data;
  }
}
