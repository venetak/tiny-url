interface URLAPIResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
}

interface URLAPIError {
  status: 'error';
  message: string;
}

export { URLAPIResponse, URLAPIError };