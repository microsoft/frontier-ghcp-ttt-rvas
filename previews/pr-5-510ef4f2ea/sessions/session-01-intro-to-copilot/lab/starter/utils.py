"""
Utility Functions Module
========================
Complete each function below using GitHub Copilot's inline suggestions.

Instructions:
1. Place your cursor at the end of the docstring
2. Press Enter to trigger Copilot
3. Review the suggestion, then press Tab to accept (or Alt+] for alternatives)
4. Test each function after completing it
"""


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
    # Let Copilot suggest the implementation here


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
    # Let Copilot suggest the implementation here


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
    # Let Copilot suggest the implementation here


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
    # Let Copilot suggest the implementation here


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
    # Let Copilot suggest the implementation here
