INSERT INTO portfolio_table (image, description, product_used, notes)
VALUES ($1, $2, $3, $4)
RETURNING *;
