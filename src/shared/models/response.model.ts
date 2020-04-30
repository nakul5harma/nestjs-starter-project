export class ResponseModel {
  code: string;
  message: string;
  data: object[] | object;

  constructor(data: object | object[], code: string, message?: string) {
    this.code = code;
    this.message = message || null;
    this.data = data;
  }
}
