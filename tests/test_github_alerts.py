"""Tests for GitHub alert rendering in MkDocs."""

from hooks.github_alerts import convert_github_alerts


def test_converts_supported_alert_types():
    markdown = """> [!NOTE]
> Note text.

> [!TIP]
> Tip text.

> [!IMPORTANT]
> Important text.

> [!WARNING]
> Warning text.

> [!CAUTION]
> Caution text.
"""

    result = convert_github_alerts(markdown)

    assert '!!! note "Note"' in result
    assert '!!! tip "Tip"' in result
    assert '!!! info "Important"' in result
    assert '!!! warning "Warning"' in result
    assert '!!! danger "Caution"' in result
    assert "    Important text." in result


def test_preserves_multiline_alert_content():
    markdown = """> [!IMPORTANT]
> Check access before the lab.
>
> - Confirm Copilot access.
> - Confirm command execution.
"""

    assert convert_github_alerts(markdown) == """!!! info "Important"

    Check access before the lab.
    
    - Confirm Copilot access.
    - Confirm command execution.
"""


def test_preserves_ordinary_blockquotes_and_fenced_examples():
    markdown = """> This remains a blockquote.

```markdown
> [!IMPORTANT]
> This remains an example.
```
"""

    assert convert_github_alerts(markdown) == markdown
