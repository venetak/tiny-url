import { createHash } from 'crypto';

function to<T>(promise: Promise<T>): Promise<[Error, null] | [null, T]> {
  return promise
    .then((data: T): [null, T] => [null, data])
    .catch((err: Error): [Error, null] => [err, null]);
}

function generateShortCode(longUrl: string): string {
  // Simple hash-based short code generation
  return createHash('md5').update(longUrl).digest('hex').slice(0, 6);
}

const errorsMap: { [key: string]: string } = {
  "getAllUrls": "Failed to retrieve URLs from the database.",
  "getURLByLongUrl": "Failed to retrieve the URL from the database.",
  "saveShortUrl": "Failed to save the short URL to the database."
}

const successMap: { [key: string]: string } = {
  "getAllUrls": "URLs retrieved successfully.",
  "getURLByLongUrl": "URL retrieved successfully.",
  "saveShortUrl": "Short URL created successfully.",
  "URLExists": "The long URL already has an associated short URL."
};

function errorMessageBuilder(errorKey: string, rawError: Error): string {
  const userFriendlyMessage = errorsMap[errorKey] || "An unknown error occurred.";
  return `${userFriendlyMessage} (Details: ${rawError.message})`;
}

function successMessageBuilder(successKey: string): string {
  return successMap[successKey] || "Operation completed successfully.";
}

function hostnameFromRequest(req: any): string {
  return `${req.protocol}://${req.get('host')}/api`;
}

export {
  to,
  generateShortCode,
  hostnameFromRequest,
  errorMessageBuilder,
  successMessageBuilder,
};