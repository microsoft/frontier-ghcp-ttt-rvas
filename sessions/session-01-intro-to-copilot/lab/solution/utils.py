"""
Utility Functions Module — Solution
====================================
Reference implementations for Exercise 1.
"""

import random
import re
import string


def celsius_to_fahrenheit(celsius: float) -> float:
    """Convert a temperature from Celsius to Fahrenheit.
    
    Args:
        celsius: Temperature in Celsius
        
    Returns:
        Temperature in Fahrenheit
        
    Examples:
        >>> celsius_to_fahrenheit(0)
        32.0
        >>> celsius_to_fahrenheit(100)
        212.0
    """
    return celsius * 9 / 5 + 32


def is_palindrome(text: str) -> bool:
    """Check if a string is a palindrome (reads the same forwards and backwards).
    
    Ignores case and non-alphanumeric characters.
    
    Args:
        text: The string to check
        
    Returns:
        True if the string is a palindrome, False otherwise
        
    Examples:
        >>> is_palindrome("racecar")
        True
        >>> is_palindrome("hello")
        False
        >>> is_palindrome("A man a plan a canal Panama")
        True
    """
    cleaned = re.sub(r'[^a-zA-Z0-9]', '', text).lower()
    return cleaned == cleaned[::-1]


def flatten_list(nested: list) -> list:
    """Flatten a nested list into a single-level list.
    
    Args:
        nested: A list that may contain nested lists
        
    Returns:
        A flat list with all elements
        
    Examples:
        >>> flatten_list([1, [2, 3], [4, [5, 6]]])
        [1, 2, 3, 4, 5, 6]
        >>> flatten_list([[1, 2], [3, 4]])
        [1, 2, 3, 4]
    """
    result = []
    for item in nested:
        if isinstance(item, list):
            result.extend(flatten_list(item))
        else:
            result.append(item)
    return result


def word_frequency(text: str) -> dict:
    """Count the frequency of each word in a text string.
    
    Words are case-insensitive. Punctuation is ignored.
    
    Args:
        text: The input text
        
    Returns:
        A dictionary mapping words to their frequency counts
        
    Examples:
        >>> word_frequency("the cat sat on the mat")
        {'the': 2, 'cat': 1, 'sat': 1, 'on': 1, 'mat': 1}
    """
    words = re.sub(r'[^\w\s]', '', text).lower().split()
    frequency = {}
    for word in words:
        frequency[word] = frequency.get(word, 0) + 1
    return frequency


def generate_password(length: int = 12) -> str:
    """Generate a random password with letters, digits, and special characters.
    
    The password must contain at least one uppercase letter, one lowercase letter,
    one digit, and one special character.
    
    Args:
        length: The desired password length (minimum 8, default 12)
        
    Returns:
        A random password string
        
    Raises:
        ValueError: If length is less than 8
    """
    if length < 8:
        raise ValueError("Password length must be at least 8")

    # Ensure at least one of each required type
    password = [
        random.choice(string.ascii_uppercase),
        random.choice(string.ascii_lowercase),
        random.choice(string.digits),
        random.choice(string.punctuation),
    ]

    # Fill the rest with a mix of all character types
    all_chars = string.ascii_letters + string.digits + string.punctuation
    password += [random.choice(all_chars) for _ in range(length - 4)]

    # Shuffle to avoid predictable positions
    random.shuffle(password)
    return ''.join(password)
