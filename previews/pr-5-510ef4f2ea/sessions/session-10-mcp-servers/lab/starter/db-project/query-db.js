const Database = require('better-sqlite3');

const query = process.argv.slice(2).join(' ').trim();

if (!query) {
  throw new Error('Pass a SQL query, for example: npm run query -- "SELECT * FROM products"');
}

const db = new Database('./data/app.db', { readonly: true });
const statement = db.prepare(query);

if (statement.reader) {
  console.table(statement.all());
} else {
  console.log(`Rows changed: ${statement.run().changes}`);
}

db.close();
