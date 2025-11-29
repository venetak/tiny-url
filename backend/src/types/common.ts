/**
 * Represents a successful API response for URL operations.
 * @template T
 */
interface URLAPIResponse<T> {
  status: 'success';
  message: string;
  data: T;
}

/**
 * Represents an error response for URL API operations.
 */
interface URLAPIError {
  status: 'error';
  error: string;
}

export { URLAPIResponse, URLAPIError };