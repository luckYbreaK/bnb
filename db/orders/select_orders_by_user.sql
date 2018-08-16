SELECT * FROM orders
JOIN suites on orders.suite_id = suites.id
WHERE orders.user_id = $1
ORDER BY arrival_date;