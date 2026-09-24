const path = require('node:path');

const { run } = require('./run-scenario.js');

const project = path.resolve(__dirname, '..');
const skill = path.resolve(project, '../../solution/skills-project/.github/skills/api-design');

console.log('TRIGGER SCENARIO');
run(path.join(project, 'scenarios/trigger.json'), skill);
console.log('\nFAILURE SCENARIO');
run(path.join(project, 'scenarios/failure.json'), skill);
