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
        shorturl: `${host}/${urlRecord.shortcode}`
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
    if (response.data) {
        // Existing URL, hydrate full object
        return {
            status: "error",
            error: errorMessageBuilder("URLExists", new Error("The Url you are trying to shorten already exists.")),
        };
    }

    const shortCode = generateShortCode(longUrl);
    const sql = `INSERT INTO "Url" (longurl, shortcode, createdat) VALUES ($1, $2, NOW())
                ON CONFLICT (longurl) DO NOTHING RETURNING *`;

    const [error, data] = await to(db.one(sql, [longUrl, shortCode]));
    if (error) return { status: 'error', error: errorMessageBuilder("saveShortUrl", error) };

    // Return full object for new URL
    return {
        status: 'success',
        message: successMessageBuilder("saveShortUrl"),
        data: {
            shorturl: `${host}/${data.shortcode}`,
            longurl: data.longurl,
            shortcode: data.shortcode,
            createdat: data.createdat || null,
        },
    };
}

export {
    getAllUrls,
    getURLByLongUrl,
    getURLByShortCode,
    saveShortUrl,
}