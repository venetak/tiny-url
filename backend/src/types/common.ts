interface URLAPIResponse<T> {
  status: 'success';
  message: string;
  data: T;
}

interface URLAPIError {
  status: 'error';
  error: string;
}

export { URLAPIResponse, URLAPIError };