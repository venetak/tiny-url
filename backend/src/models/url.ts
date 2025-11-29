import db from '../config/db-connection.js'
import  { URLAPIResponse, URLAPIError } from '../types/common.js';
import { to, generateShortCode } from '../helpers.js';


async function getAllUrls(): Promise<URLAPIResponse<any[]> | URLAPIError> {
    const [err, data] = await to(db.any('SELECT * FROM "Url"'));

    if (err) return { status: 'error', message: err.message };
    return { status: 'success', data };
}

async function getURLByLongUrl(longUrl: string): Promise<URLAPIResponse<any> | URLAPIError> {
    const [err, data] = await to(db.oneOrNone('SELECT * FROM "Url" WHERE "longurl" = $1', [longUrl]));

    if (err) return { status: 'error', message: err.message };
    return { status: 'success', data };
}

async function saveShortUrl(longUrl: string): Promise<URLAPIResponse<any> | URLAPIError> {
    const response = await getURLByLongUrl(longUrl);
    if (response.status === 'error') return response;
    if (response.data) return { status: 'success', message: 'URL already exists' }; // URL already exists

    const shortCode = generateShortCode(longUrl);

    const sql = `INSERT INTO "Url" (longurl, shortcode) VALUES ($1, $2)
                ON CONFLICT (longurl) DO NOTHING RETURNING *`;
    const [err, data] = await to(db.one(sql, [longUrl, shortCode]));
    console.log('Generated short code:', data);

    if (err) return { status: 'error', message: err.message };
    return { status: 'success', data };
}

export { getAllUrls, getURLByLongUrl, saveShortUrl }