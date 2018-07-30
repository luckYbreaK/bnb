CREATE TABLE suites (
    id SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    description TEXT NOT NULL,
    bed_size VARCHAR(20) NOT NULL,
    tub_type VARCHAR(20) NOT NULL,
    shower_type VARCHAR(20) NOT NULL,
    roku BOOLEAN DEFAULT FALSE,
    plex BOOLEAN DEFAULT FALSE,
    pool_table BOOLEAN DEFAULT FALSE,
    fireplace BOOLEAN DEFAULT FALSE,
    fridge BOOLEAN DEFAULT FALSE,
    closet BOOLEAN DEFAULT FALSE,
    wi_fi BOOLEAN DEFAULT FALSE,
    weekday_price DECIMAL NOT NULL,
    weekend_price DECIMAL NOT NULL,
    special_id INTEGER REFERENCES specials(id)
);