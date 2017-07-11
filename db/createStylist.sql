INSERT INTO stylist_table (name, lastname, email, password) VALUES  ($1, $2, $3, $4)
RETURNING *;
