UPDATE users
SET username = $1, first_name = $2, last_name = $3
WHERE email = $4;