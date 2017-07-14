select sum(sale) as daily
from sales_table
where date_part('day', date) = date_part('day', now()) and date_part('month', date) = date_part('month', now()) and date_part('year', date) = date_part('year', now()) and stylist_id = $1;
