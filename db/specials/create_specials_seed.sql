CREATE TABLE specials (
    id SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    special_price DECIMAL DEFAULT 0
);