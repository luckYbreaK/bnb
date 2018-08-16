SELECT * FROM orders
JOIN users on orders.user_id = users.id
JOIN suites on orders.suite_id = suites.id
WHERE users.id = $1;