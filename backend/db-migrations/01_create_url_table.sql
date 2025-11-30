CREATE TABLE IF NOT EXISTS "Url" (
    id SERIAL PRIMARY KEY,
    longurl TEXT UNIQUE NOT NULL,
    shortcode VARCHAR(255) UNIQUE NOT NULL,
    createdat TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_url_longurl ON "Url"(longurl);
CREATE INDEX IF NOT EXISTS idx_url_shortcode ON "Url"(shortcode);
