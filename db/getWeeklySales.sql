select sum(sale) as weekly
from sales_table
where date > now() - interval '7 days'
and stylist_id = $1;
