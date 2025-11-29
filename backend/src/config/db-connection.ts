import dotenv from 'dotenv';
import path from 'path';
const pgp = (await import('pg-promise')).default();

dotenv.config({ path: '.env' });

const {
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DB_PORT,
	DB_NAME
} = process.env;

export default pgp(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);