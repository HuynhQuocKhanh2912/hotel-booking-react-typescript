export interface BaseApiResponse<T> {
  statusCode: number;
  message: string;
  dateTime: Date;
  content: T;
}
