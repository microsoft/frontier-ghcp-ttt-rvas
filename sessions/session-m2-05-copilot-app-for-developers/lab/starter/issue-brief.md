Order totals are wrong in three cases.

## Rules

- Shipping is a flat 4.99. It is free when the **item subtotal after the coupon** is 50.00 or more.
- A coupon is a percentage off the items. It never reduces shipping.
- Totals round **half up** to the cent (60.125 becomes 60.13).

## Symptoms

- An order of exactly 50.00 still pays shipping.
- A 10% coupon on a 20.00 order also discounts the shipping.
- A 55.00 order with a 10% coupon ships free, but the discounted items are 49.50, so it should pay shipping.
- 60.125 rounds to 60.12.

## Done when

`python -m unittest discover -s tests` passes. Don't change the tests.
