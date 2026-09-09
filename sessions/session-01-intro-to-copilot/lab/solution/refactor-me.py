"""
Refactor Me — Solution
======================
Clean version with consistent naming (snake_case), f-strings, and type hints.
"""

# --- User data processing (consistent snake_case naming) ---

username = "alice_smith"
user_email = "alice@example.com"
user_age = 30


def get_user_info(username: str, user_email: str, user_age: int) -> str:
    """Get formatted user info string."""
    return f"User: {username}, Email: {user_email}, Age: {user_age}"


def calculate_total(prices: list[float], tax_rate: float) -> float:
    """Calculate total price with tax."""
    subtotal = sum(prices)
    tax_amount = subtotal * tax_rate
    total = subtotal + tax_amount
    return total


def format_currency(amount: float) -> str:
    """Format a number as currency."""
    return f"${amount:.2f}"


def get_user_summary(username: str, user_email: str, user_age: int, purchases: list[float]) -> str:
    """Create a summary string for a user."""
    info = get_user_info(username, user_email, user_age)
    total = calculate_total(purchases, 0.08)
    formatted_total = format_currency(total)
    return f"{info} | Total Purchases: {formatted_total}"


# --- Usage ---

if __name__ == "__main__":
    purchases = [29.99, 49.50, 15.00, 8.75]
    result = get_user_summary(username, user_email, user_age, purchases)
    print(result)

    greeting = f"Hello, {username}!"
    print(greeting)

    age_msg = f"{username} is {user_age} years old."
    print(age_msg)
