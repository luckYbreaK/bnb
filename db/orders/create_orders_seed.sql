CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_date TIMESTAMP NOT NULL,
    arrival_date DATE NOT NULL,
    departure_date DATE NOT NULL,
    order_total DECIMAL NOT NULL,
    user_id INTEGER REFERENCES users(id),
    suite_id INTEGER REFERENCES suites(id)
);