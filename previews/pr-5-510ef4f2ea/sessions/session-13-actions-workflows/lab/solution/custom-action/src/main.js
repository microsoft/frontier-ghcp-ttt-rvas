const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    // Read inputs
    const threshold = parseInt(core.getInput('threshold') || '70', 10);
    const reportFormat = core.getInput('report-format') || 'markdown';

    console.log(`Quality threshold: ${threshold}`);
    console.log(`Report format: ${reportFormat}`);

    // Scan JavaScript files (excluding node_modules, .git, dist)
    const excludeDirs = new Set(['node_modules', '.git', 'dist', 'coverage', 'build']);
    const jsFiles = findFiles('.', '.js', excludeDirs);
    console.log(`Found ${jsFiles.length} JavaScript files`);

    // Calculate metrics per file
    const fileMetrics = jsFiles.map(filePath => analyzeFile(filePath));

    // Compute overall score
    const totalTodos = fileMetrics.reduce((sum, m) => sum + m.todos, 0);
    const complexFunctions = fileMetrics.reduce((sum, m) => sum + m.complexFunctions, 0);
    const totalLines = fileMetrics.reduce((sum, m) => sum + m.codeLines, 0);

    let score = 100;
    score -= totalTodos * 2;        // -2 per TODO/FIXME
    score -= complexFunctions * 1;  // -1 per complex function
    score = Math.max(0, score);     // Floor at 0

    const passed = score >= threshold;

    // Set outputs
    core.setOutput('score', score.toString());
    core.setOutput('passed', passed.toString());

    console.log(`\nQuality Score: ${score}/100`);
    console.log(`Threshold: ${threshold}`);
    console.log(`Passed: ${passed}`);

    // Generate report
    if (reportFormat === 'markdown') {
      const summary = generateMarkdownReport(fileMetrics, score, threshold, passed, totalLines, totalTodos, complexFunctions);

      // Write to GitHub Step Summary
      const summaryFile = process.env.GITHUB_STEP_SUMMARY;
      if (summaryFile) {
        fs.appendFileSync(summaryFile, summary);
      }
      console.log('\nMarkdown summary written to $GITHUB_STEP_SUMMARY');
    } else {
      const jsonReport = {
        score,
        threshold,
        passed,
        totalFiles: jsFiles.length,
        totalLines,
        totalTodos,
        complexFunctions,
        files: fileMetrics,
      };
      console.log(JSON.stringify(jsonReport, null, 2));
    }

    // Fail if below threshold
    if (!passed) {
      core.setFailed(`Quality score ${score} is below threshold ${threshold}`);
    }
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

function findFiles(dir, ext, excludeDirs) {
  const results = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (!excludeDirs.has(entry.name)) {
          results.push(...findFiles(fullPath, ext, excludeDirs));
        }
      } else if (entry.isFile() && entry.name.endsWith(ext)) {
        results.push(fullPath);
      }
    }
  } catch (err) {
    core.warning(`Could not read directory: ${dir} — ${err.message}`);
  }

  return results;
}

function analyzeFile(filePath) {
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    core.warning(`Could not read file: ${filePath} — ${err.message}`);
    return { file: filePath, codeLines: 0, todos: 0, complexity: 0, complexFunctions: 0 };
  }

  const lines = content.split('\n');

  // Count code lines (excluding blank lines and single-line comments)
  const codeLines = lines.filter(line => {
    const trimmed = line.trim();
    return trimmed.length > 0 && !trimmed.startsWith('//') && !trimmed.startsWith('*');
  }).length;

  // Count TODO/FIXME
  const todos = (content.match(/\b(TODO|FIXME|HACK|XXX)\b/gi) || []).length;

  // Estimate complexity (count control flow statements)
  const complexityKeywords = /\b(if|else|for|while|switch|case|catch|&&|\|\||\?)\b/g;
  const complexity = (content.match(complexityKeywords) || []).length;

  // Count functions with high complexity (rough: >10 control statements per function)
  const complexFunctions = complexity > 10 ? 1 : 0;

  return { file: filePath, codeLines, todos, complexity, complexFunctions };
}

function generateMarkdownReport(fileMetrics, score, threshold, passed, totalLines, totalTodos, complexFunctions) {
  const statusEmoji = passed ? '✅' : '❌';
  const statusText = passed ? 'PASSED' : 'FAILED';

  let md = `## ${statusEmoji} Code Quality Report — ${statusText}\n\n`;
  md += `| Metric | Value |\n`;
  md += `|--------|-------|\n`;
  md += `| **Score** | ${score}/100 |\n`;
  md += `| **Threshold** | ${threshold} |\n`;
  md += `| **Files Scanned** | ${fileMetrics.length} |\n`;
  md += `| **Lines of Code** | ${totalLines} |\n`;
  md += `| **TODOs/FIXMEs** | ${totalTodos} |\n`;
  md += `| **Complex Functions** | ${complexFunctions} |\n\n`;

  if (fileMetrics.length > 0) {
    md += `### Per-File Breakdown\n\n`;
    md += `| File | Lines | TODOs | Complexity |\n`;
    md += `|------|-------|-------|------------|\n`;
    for (const m of fileMetrics) {
      md += `| ${m.file} | ${m.codeLines} | ${m.todos} | ${m.complexity} |\n`;
    }
  }

  return md;
}

run();
