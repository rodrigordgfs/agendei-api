import pkg from 'pg';
const { Pool } = pkg;

const database = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default database;
