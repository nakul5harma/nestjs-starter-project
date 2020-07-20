export interface RequestLogData {
  fromIP: string | string[];
  requestMethod: string;
  originalUri: string;
  uri: string;
  requestBody: object;
  requestHeaders: object;
  referer: string;
  userAgent: string;
}
