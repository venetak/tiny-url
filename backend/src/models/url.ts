import db from '../config/db-connection.js'
import  { URLAPIResponse, URLAPIError } from '../types/common.js';
import { to, generateShortCode, errorMessageBuilder, successMessageBuilder } from '../helpers.js';



/**
 * Retrieves all URLs from the database.
 * @returns {Promise<URLAPIResponse<any[]> | URLAPIError>} Array of URL records or error response
 */
async function getAllUrls(host: string): Promise<URLAPIResponse<any[]> | URLAPIError> {
    const [error, data] = await to(db.any('SELECT * FROM "Url"'));

    if (error) return { status: 'error', error: errorMessageBuilder("getAllUrls", error) };

    // Generate the shortUrl dynamically as a virtual field using the current request's host and protocol,
    // so you don't need to update stored URLs when deploying to a different domain or environment.
    const hydratedData = data.map((urlRecord: any) => ({
        ...urlRecord,
        shortUrl: `${host}/${urlRecord.shortcode}`
    }));
    return { status: 'success', data: hydratedData, message: successMessageBuilder("getAllUrls") };
}

/**
 * Retrieves a URL record by its long URL.
 * @param {string} longUrl - The original long URL
 * @returns {Promise<URLAPIResponse<any> | URLAPIError>} The URL record or error response
 */
async function getURLByLongUrl(longUrl: string): Promise<URLAPIResponse<any> | URLAPIError> {
    const [error, response] = await to(db.oneOrNone('SELECT * FROM "Url" WHERE "longurl" = $1', [longUrl]));

    if (error) return { status: 'error', error: errorMessageBuilder("getURLByLongUrl", error) };
    return { status: 'success', data: response, message: successMessageBuilder("getURLByLongUrl") };
}

/**
 * Retrieves a URL record by its short code.
 * @param {string} shortCode - The short code of the URL
 * @returns {Promise<URLAPIResponse<any> | URLAPIError>} The URL record or error response
 */
async function getURLByShortCode(shortCode: string): Promise<URLAPIResponse<any> | URLAPIError> {
    const [error, response] = await to(db.oneOrNone('SELECT * FROM "Url" WHERE "shortcode" = $1', [shortCode]));

    if (error) return { status: 'error', error: errorMessageBuilder("getURLByShortCode", error) };
    return { status: 'success', data: response, message: successMessageBuilder("getURLByShortCode") };
}

/**
 * Creates a new short URL record in the database if it does not already exist.
 * @param {string} longUrl - The original long URL
 * @returns {Promise<URLAPIResponse<any> | URLAPIError>} The newly created short URL or error response
 */
async function saveShortUrl(longUrl: string, host: string): Promise<URLAPIResponse<any> | URLAPIError> {
    const response = await getURLByLongUrl(longUrl);
    if (response.status === 'error') return response;
    if (response.data) return {
        status: response.status,
        data: `${host}/${response.data.shortcode}`,
        message: successMessageBuilder("URLExists")
    }; // URL already exists

    const shortCode = generateShortCode(longUrl);
    const sql = `INSERT INTO "Url" (longurl, shortcode) VALUES ($1, $2)
                ON CONFLICT (longurl) DO NOTHING RETURNING *`;

    const [error, data] = await to(db.one(sql, [longUrl, shortCode]));
    if (error) return { status: 'error', error: errorMessageBuilder("saveShortUrl", error) };

    return {
        status: 'success',
        message: successMessageBuilder("saveShortUrl"),
        data: `http://localhost:3000/${data.shortcode}`,
    };
}

export {
    getAllUrls,
    getURLByLongUrl,
    getURLByShortCode,
    saveShortUrl,
}