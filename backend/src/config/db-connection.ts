/**
 * Configures and exports the PostgreSQL database connection using pg-promise.
 */
import dotenv from 'dotenv';
const pgp = (await import('pg-promise')).default();

dotenv.config({ path: '.env' });

const {
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DB_PORT,
	DB_NAME
} = process.env;

/**
 * Database connection instance
 */
export default pgp(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);