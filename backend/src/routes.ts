import express from 'express';
const router = express.Router();
import { shortenUrl, listUrls, redirectShortUrl } from './controllers.js';
import { validateUrlInput } from './middlewares.js';

/**
 * Route to shorten a URL.
 * @name POST /shorten
 */
router.post('/api/shorten', validateUrlInput, shortenUrl);

/**
 * Route to list all URLs.
 * @name GET /urls
 */
router.get('/api/urls', listUrls);

/**
 * Route to redirect a short code to its long URL.
 * @name GET /:shortCode
 */
router.get('/:shortCode', redirectShortUrl);

export default router;
