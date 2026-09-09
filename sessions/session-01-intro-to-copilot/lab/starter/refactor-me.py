"""
Refactor Me — Next Edit Suggestions Exercise
=============================================
This file has intentionally inconsistent naming, formatting, and patterns.
Use NES (Next Edit Suggestions) to fix it up!

Instructions:
1. Rename a variable in one place — watch NES suggest the same rename elsewhere
2. Convert string formatting — watch NES suggest similar conversions
3. Add type hints — watch NES suggest them on other functions
"""

# --- User data processing (inconsistent naming: camelCase mixed with abbreviations) ---

usrNm = "alice_smith"
usrEml = "alice@example.com"
usrAge = 30


def getUsrInfo(usrNm, usrEml, usrAge):
    """Get formatted user info string."""
    msg = "User: " + usrNm + ", Email: " + usrEml + ", Age: " + str(usrAge)
    return msg


def calcTtl(prices, taxRate):
    """Calculate total price with tax."""
    subTtl = 0
    for p in prices:
        subTtl = subTtl + p
    taxAmt = subTtl * taxRate
    ttl = subTtl + taxAmt
    return ttl


def fmtCurrency(amt):
    """Format a number as currency."""
    result = "$" + str(round(amt, 2))
    return result


def getUsrSummary(usrNm, usrEml, usrAge, purchases):
    """Create a summary string for a user."""
    info = getUsrInfo(usrNm, usrEml, usrAge)
    ttl = calcTtl(purchases, 0.08)
    fmtTtl = fmtCurrency(ttl)
    summary = info + " | Total Purchases: " + fmtTtl
    return summary


# --- Usage ---

if __name__ == "__main__":
    purchases = [29.99, 49.50, 15.00, 8.75]
    result = getUsrSummary(usrNm, usrEml, usrAge, purchases)
    print(result)
    
    # More string concatenation that should be f-strings
    greeting = "Hello, " + usrNm + "!"
    print(greeting)
    
    age_msg = usrNm + " is " + str(usrAge) + " years old."
    print(age_msg)
