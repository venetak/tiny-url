import { Request, Response, NextFunction } from 'express';

// Middleware to validate URL input
export function validateUrlInput(req: Request, res: Response, next: NextFunction) {
	const { longUrl } = req.body;
	try {
		// Basic URL validation using URL constructor
		new URL(longUrl);

		// Check for malicious intent (simple checks)
		// Disallow javascript: and data: schemes
		if (/^(javascript:|data:)/i.test(longUrl)) {
			return res.status(400).json({ error: 'Malicious URL scheme detected.' });
		}

		// Disallow script tags or suspicious characters
		if (/<script|onerror=|onload=|<img|<iframe|<svg|<object|<embed|<link|<style|<base|<form|<input|<textarea|<button|<select|<option|<a\s+href=/i.test(longUrl)) {
			return res.status(400).json({ error: 'Malicious content detected in URL.' });
		}

		// Disallow SQL injection patterns (very basic)
		if (/('|"|;|--|\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND)\b)/i.test(longUrl)) {
			return res.status(400).json({ error: 'Suspicious characters detected in URL.' });
		}
		next();
	} catch (err) {
		res.status(400).json({ error: 'Invalid URL format.' });
	}
}
