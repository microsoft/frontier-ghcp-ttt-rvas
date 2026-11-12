# Checkout pricing: sample repo

A tiny Python project with four failing tests. Use it as a throwaway repo for the Session M2-05 lab. It has no dependencies. You need Python 3.10 or later.

```bash
python -m unittest discover -s tests -v
```

| File | Purpose |
| --- | --- |
| `shop/pricing.py` | Order total with shipping and coupons. It has the bugs. |
| `tests/test_pricing.py` | Five tests. Four fail. |
| `issue-brief.md` | Body for the GitHub issue you create in the lab. |
| `.github/workflows/test.yml` | Runs the tests on every push and pull request. |

All data is synthetic.
