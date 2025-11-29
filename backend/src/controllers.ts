import { Request, Response, NextFunction } from 'express';

function shortenUrl(req: Request, res: Response) {
	const { longUrl } = req.body;
	// Here you would add logic to create a short URL
	const shortUrl = 'abc123'; // Placeholder
	res.json({ shortUrl, longUrl });
}

function listUrls(req: Request, res: Response) {
	// returns list of all URLs
    // TODO: get them from DB
	res.json([
		{ shortUrl: 'abc123', longUrl: 'https://example.com', clicks: 10 },
		{ shortUrl: 'xyz789', longUrl: 'https://another.com', clicks: 5 }
	]);
}

function redirectShortUrl(req: Request, res: Response) {
	// expects shortCode in params
	// should redirect to longUrl and increment click count
	// Example: res.redirect(301, 'https://example.com');
	res.redirect(302, 'https://example.com');
    
}


export { shortenUrl, listUrls, redirectShortUrl };