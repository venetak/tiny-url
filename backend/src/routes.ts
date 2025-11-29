import express from 'express';
const router = express.Router();
import { shortenUrl, listUrls, redirectShortUrl } from './controllers.js';

// POST /api/shorten
router.post('/api/shorten', shortenUrl);

// GET /api/urls
router.get('/api/urls', listUrls);

// GET /:shortCode
router.get('/:shortCode', redirectShortUrl);

export default router;
