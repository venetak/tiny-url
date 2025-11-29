import { Request, Response, NextFunction } from 'express';
import { getAllUrls, getURLByLongUrl, saveShortUrl } from './models/url.js';
import { URLAPIResponse, URLAPIError } from './types/common.js';

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

async function listUrls(req: Request, res: Response) {
	// returns list of all URLs
    const urls = await getAllUrls();
	res.json(urls);
}

function redirectShortUrl(req: Request, res: Response) {
	// expects shortCode in params
	// should redirect to longUrl and increment click count
	// Example: res.redirect(301, 'https://example.com');
	res.redirect(302, 'https://example.com');
    
}


export { shortenUrl, listUrls, redirectShortUrl };