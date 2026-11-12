FREE_SHIPPING_MIN = 50.00
SHIPPING_FLAT = 4.99


def subtotal(items):
    """items is a list of (unit_price, quantity) pairs."""
    return sum(price * qty for price, qty in items)


def shipping(order_subtotal):
    return 0.0 if order_subtotal > FREE_SHIPPING_MIN else SHIPPING_FLAT


def order_total(items, coupon_percent=0):
    sub = subtotal(items)
    total = (sub + shipping(sub)) * (1 - coupon_percent / 100)
    return round(float(total), 2)
