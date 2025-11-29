/**
 * Controller functions for URL shortening and retrieval.
 */
import { Request, Response, NextFunction } from 'express';
import { saveShortUrl, getAllUrls } from './models/url.js';


/**
 * Shortens a given long URL and returns the result.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
async function shortenUrl(req: Request, res: Response) {
	console.log('Received request to shorten URL');
	const { longUrl } = req.body;
	const response = await saveShortUrl(longUrl);

	if (response.status === 'error') return res.json({ error: response.error, status: 'error' });

	res.json({ 
		status: response.status,
		message: response.message,
		data: response.data 
	});
}


/**
 * Lists all shortened URLs.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
async function listUrls(req: Request, res: Response) {
	// returns list of all URLs
	const urls = await getAllUrls();
	res.json(urls);
}


/**
 * Redirects a short URL to its corresponding long URL.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
function redirectShortUrl(req: Request, res: Response) {
	// expects shortCode in params
	// should redirect to longUrl and increment click count
	// Example: res.redirect(301, 'https://example.com');
	res.redirect(302, 'https://example.com');
}


export { shortenUrl, listUrls, redirectShortUrl };