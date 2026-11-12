# Entry format

```markdown
## <version> (<YYYY-MM-DD>)

**Highlights:** <one sentence, the one or two changes users care about most>

### Added
- <new capability>. (#PR)

### Changed
- <changed behavior>. (#PR)

### Fixed
- <bug, described by what the user saw>. (#PR)

### Upgrade notes
- <action the reader must take, or "None.">
```

## Grouping

| Label | Section |
| --- | --- |
| feature | Added |
| performance, breaking | Changed |
| bug | Fixed |
| chore, dependencies, docs | Leave out |

Omit a section that has no entries. Always keep **Upgrade notes**.

Include the measured result for performance changes (for example, "480 ms to 190 ms").
