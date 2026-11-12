from decimal import Decimal, ROUND_HALF_UP

FREE_SHIPPING_MIN = Decimal("50.00")
SHIPPING_FLAT = Decimal("4.99")
CENT = Decimal("0.01")


def _money(value):
    return value.quantize(CENT, rounding=ROUND_HALF_UP)


def subtotal(items):
    """items is a list of (unit_price, quantity) pairs."""
    return sum((Decimal(str(price)) * qty for price, qty in items), Decimal("0"))


def shipping(order_subtotal):
    return Decimal("0") if order_subtotal >= FREE_SHIPPING_MIN else SHIPPING_FLAT


def order_total(items, coupon_percent=0):
    discounted = subtotal(items) * (Decimal(100) - Decimal(str(coupon_percent))) / 100
    return float(_money(discounted + shipping(discounted)))
