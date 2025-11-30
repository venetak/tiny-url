/**
 * Controller functions for URL shortening and retrieval.
 */
import { Request, Response, NextFunction } from 'express';
import { saveShortUrl, getAllUrls, getURLByShortCode } from './models/url.js';
import { hostnameFromRequest } from './helpers.js';

/**
 * Shortens a given long URL and returns the result.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
async function shortenUrl(req: Request, res: Response) {
  console.log('Received request to shorten URL');
  const { longUrl } = req.body;
  const host = hostnameFromRequest(req);
  const response = await saveShortUrl(longUrl, host);

  // Always return a full URL object for frontend compatibility
  res.json(response);
}

/**
 * Lists all shortened URLs.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
async function listUrls(req: Request, res: Response) {
  // returns list of all URLs
  const host = hostnameFromRequest(req);
  const urls = await getAllUrls(host);
  res.json(urls);
}

/**
 * Redirects a short URL to its corresponding long URL.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
async function redirectShortUrl(req: Request, res: Response) {
  // expects shortCode in params
  const { shortCode } = req.params;
  const url = await getURLByShortCode(shortCode);

  if (url.status === 'error') {
    return res.status(404).json({ error: url.error });
  }

  res.redirect(302, url.data.longurl);
}

export { shortenUrl, listUrls, redirectShortUrl };
