select sum(sale) as monthly
from sales_table
where date_part('month', date) = date_part('month', now()) and date_part('year', date) = date_part('year', now()) and stylist_id = $1;
