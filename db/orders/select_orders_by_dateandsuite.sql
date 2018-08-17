SELECT arrival_date, departure_date FROM orders
JOIN suites on orders.suite_id = suites.id
WHERE suites.id = $1;