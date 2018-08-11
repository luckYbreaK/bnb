CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(60) NOT NULL,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    email VARCHAR(60) NOT NULL,
    phone VARCHAR(15),
    permission_type VARCHAR(60) DEFAULT 'user'
);