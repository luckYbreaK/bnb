CREATE TABLE suite_images(
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    suite_id INTEGER REFERENCES suites(id)
);