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

export { to, generateShortCode };