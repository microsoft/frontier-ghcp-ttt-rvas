# Explain Challenges

Use the standalone `copilot` CLI for each command below. Ask in interactive mode or with `copilot -p "Explain what this command does: ..."`. Rate the explanation and record what it covered or missed.

---

## Challenge 1: Simple — File Listing

```bash
ls -la
```

**Your task:** Explain this command. Does Copilot mention that `-l` is "long format" and `-a` includes hidden files (dotfiles)?

**Run:**

```bash
copilot -p "Explain what this command does: ls -la"
```

**Your rating (1–5):** ___  
**What it covered well:**___  
**What it missed:** ___

---

## Challenge 2: Moderate — Find and Delete

```bash
find . -name "*.log" -mtime +7 -delete
```

**Your task:** Explain this command. Does Copilot warn about the destructive nature of `-delete`? Does it explain `-mtime +7` correctly (files modified MORE than 7 days ago)?

**Run:**

```bash
copilot -p 'Explain what this command does and call out safety risks: find . -name "*.log" -mtime +7 -delete'
```

**Your rating (1–5):** ___  
**What it covered well:**___  
**What it missed:** ___

---

## Challenge 3: Git-Specific — Visual Log

```bash
git log --oneline --graph --all --decorate
```

**Your task:** Explain this command. Does Copilot describe the ASCII graph visualization? Does it explain that `--all` shows all branches, not just the current one?

**Run:**

```bash
copilot -p "Explain what this command does: git log --oneline --graph --all --decorate"
```

**Your rating (1–5):** ___  
**What it covered well:**___  
**What it missed:** ___

---

## Challenge 4: Multi-Flag — Archive with Exclusions

```bash
tar czf backup.tar.gz --exclude='node_modules' --exclude='.git' ./src
```

**Your task:** Explain this command. Does Copilot explain the `czf` flags individually (`c` = create, `z` = gzip, `f` = filename)? Does it explain that multiple `--exclude` flags are cumulative?

**Run:**

```bash
copilot -p "Explain what this command does: tar czf backup.tar.gz --exclude='node_modules' --exclude='.git' ./src"
```

**Your rating (1–5):** ___  
**What it covered well:**___  
**What it missed:** ___

---

## Challenge 5: Complex — AWK Data Processing

```bash
awk -F',' '{sum[$1]+=$3; count[$1]++} END {for (k in sum) print k, sum[k]/count[k]}'
```

**Your task:** This CSV pipeline computes an average for each group. Check whether Copilot explains:

- `-F','` sets the field separator to comma?
- `$1` and `$3` reference the 1st and 3rd columns?
- `sum[$1]` and `count[$1]` are associative arrays keyed by the first column?
- The `END` block computes the average for each group?

**Run:**

```bash
copilot -p "Explain this awk command: awk -F',' '{sum[\$1]+=\$3; count[\$1]++} END {for (k in sum) print k, sum[k]/count[k]}'"
```

> **Note:** You may need to escape the `$` characters depending on your shell. If you get unexpected results, wrap the command in single quotes or use different escaping.

**Your rating (1–5):** ___  
**What it covered well:**___  
**What it missed:** ___

---

## Summary

After completing all 5 challenges, reflect:

1. Which command types did Copilot explain best? ___
2. Which did it struggle with? ___
3. Did it ever miss important safety warnings (e.g., for `-delete`)? ___
4. Would you trust these explanations to teach a junior developer? ___
