const fs = require('node:fs');
const path = require('node:path');

const { loadSkill, runScenario } = require('./skill-contract.js');

function run(scenarioPath, skillDirectory) {
  const scenario = JSON.parse(fs.readFileSync(path.resolve(scenarioPath), 'utf8'));
  const skill = loadSkill(path.resolve(skillDirectory));
  const result = runScenario(skill, scenario);
  console.log(JSON.stringify(result, null, 2));
  return result;
}

if (require.main === module) {
  run(process.argv[2], process.argv[3]);
}

module.exports = { run };
