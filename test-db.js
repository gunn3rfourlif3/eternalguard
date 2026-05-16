const { Client } = require('pg');

// PASTE YOUR FULL CONNECTION STRING HERE
const connectionString = "postgresql://postgres:Arsenal.fclub2027@eternalguard.cluster-cn6eqccuwehr.eu-north-1.rds.amazonaws.com:5432/postgres?sslmode=no-verify";

const client = new Client({
  connectionString: connectionString,
});

async function testConnection() {
  try {
    console.log("Checking credentials...");
    await client.connect();
    const res = await client.query('SELECT NOW()');
    console.log("SUCCESS! The password is correct. Server time:", res.rows[0].now);
    await client.end();
  } catch (err) {
    console.error("FAILURE:", err.message);
    process.exit(1);
  }
}

testConnection();