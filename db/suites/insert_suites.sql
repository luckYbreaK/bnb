INSERT INTO suites
(title, description, bed_size, tub_type, shower_type, roku, plex, pool_table, fireplace,
fridge, closet, wi_fi, weekday_price, weekend_price, balcony, patio)
VALUES
($1, $2, $3, $4, $5, $6, %7, $8, $9, $10, $11, $12, $13, $14, $15, $16);
