const pgp = (await import('pg-promise')).default();
export default pgp('postgres://postgres:12345@localhost:5432/tiny-url')