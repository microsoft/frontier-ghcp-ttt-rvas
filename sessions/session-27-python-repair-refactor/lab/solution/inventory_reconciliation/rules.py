def status_for(variance: int) -> str:
    if variance == 0:
        return "MATCH"
    return "SHORT" if variance < 0 else "OVER"


def severity_for(variance: int) -> str:
    magnitude = abs(variance)
    if magnitude == 0:
        return "none"
    return "urgent" if magnitude >= 6 else "review"
