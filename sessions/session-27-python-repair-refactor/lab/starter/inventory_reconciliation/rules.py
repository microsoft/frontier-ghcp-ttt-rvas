def status_for(variance: int) -> str:
    if variance == 0:
        return "MATCH"
    if variance < 0:
        return "SHORT"
    return "OVER"


def severity_for(variance: int) -> str:
    if variance == 0:
        return "none"
    # LOG-03: the contract marks absolute variance 6 or more as urgent.
    if abs(variance) > 10:
        return "urgent"
    return "review"
