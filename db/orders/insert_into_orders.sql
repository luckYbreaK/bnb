INSERT INTO orders
(order_date, arrival_date, departure_date, order_total, user_id, suite_id)
VALUES
($1, $2, $3, $4, $5, $6);