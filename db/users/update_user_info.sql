UPDATE users
SET email = $1, phone = $2, first_name = $3, last_name = $4
WHERE id = $5;