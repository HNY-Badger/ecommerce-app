export type APIError = {
  code: string;
  message: string;
};

export type APIErrorResponse = {
  error: string;
  error_description: string;
  errors: APIError[];
  message: string;
  statusCode: number;
};
