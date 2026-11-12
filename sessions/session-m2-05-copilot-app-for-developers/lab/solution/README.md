# Reference fix

`shop/pricing.py` here passes all five tests. Compare it with what the app produced. Yours doesn't need to match line by line.

The three real fixes:

1. `>` becomes `>=` for the free-shipping check.
2. The coupon applies to the subtotal. Then shipping is decided on the discounted subtotal and added after.
3. Money uses `Decimal` with `ROUND_HALF_UP`. Python's `round()` on floats rounds ties to even, so 60.125 gives 60.12.

Things to check in the app's diff:

- It didn't edit the tests.
- It didn't change the function signature. Callers still pass `(price, quantity)` pairs.
- It didn't add a dependency.
- `order_total` still returns a `float`. The tests compare to floats.

## Sample comparison note

> I ran the second task (reject negative quantities) in the Copilot CLI. The CLI took one prompt and finished in a minute. In the app I reviewed a plan first, then a diff panel with a PR button. For a small change the CLI was faster. For work I want to review and ship as a PR, the app's diff view and `/pr-open` saved steps. I wouldn't use the app for a one-line fix.
