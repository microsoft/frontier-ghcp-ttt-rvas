import unittest

from shop.pricing import order_total


class OrderTotalTests(unittest.TestCase):
    def test_small_order_pays_flat_shipping(self):
        items = [(10.00, 2)]
        self.assertEqual(order_total(items), 24.99)

    def test_free_shipping_at_exactly_the_minimum(self):
        items = [(25.00, 2)]
        self.assertEqual(order_total(items), 50.00)

    def test_coupon_applies_to_items_only_not_shipping(self):
        items = [(10.00, 2)]
        self.assertEqual(order_total(items, coupon_percent=10), 22.99)

    def test_coupon_can_drop_order_below_free_shipping(self):
        items = [(27.50, 2)]
        self.assertEqual(order_total(items, coupon_percent=10), 54.49)

    def test_rounds_half_up_to_cents(self):
        items = [(60.125, 1)]
        self.assertEqual(order_total(items), 60.13)


if __name__ == "__main__":
    unittest.main()
