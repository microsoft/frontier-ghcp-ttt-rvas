# Reference automation specification

## Trigger

Manual.

## Access

Read issue content, pull-request files, review threads, and check status. Grant no
write-capable tools.

## Output contract

Return:

- `READY`, `NOT_READY`, or `UNKNOWN` as a suggestion;
- stable blocker reason codes;
- direct evidence references;
- missing or stale evidence;
- a reminder that a human decides.

## Prohibited actions

The automation cannot comment, label, push, approve, merge, close, reopen, or
resolve review threads.
