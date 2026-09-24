"""Reference implementation for the Session 01 inline-suggestions lab."""

import re


def normalize_username(value: str) -> str:
    """Trim outer whitespace, lowercase the value, and join words with hyphens."""
    words = value.strip().lower().split()
    return "-".join(words)


def is_palindrome(text: str) -> bool:
    """Return True when letters and digits read the same in either direction."""
    normalized = "".join(character.lower() for character in text if character.isalnum())
    return normalized == normalized[::-1]


def word_frequency(text: str) -> dict[str, int]:
    """Count words without changing the input string.

    Words are case-insensitive. Apostrophes inside a word are preserved.
    """
    counts: dict[str, int] = {}
    for word in re.findall(r"[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*", text.lower()):
        counts[word] = counts.get(word, 0) + 1
    return counts


def profile_summary(handle: str, interests: list[str]) -> str:
    """Return a short profile summary with normalized interest names."""
    normalized_interests = [interest.strip().lower() for interest in interests]
    return f"{handle}: {', '.join(normalized_interests)}"
