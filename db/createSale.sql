INSERT INTO sales_table (client_fname, client_lname, service, product, sale, tips, note, stylist_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;
