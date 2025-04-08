import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '426833',
  port: 5432,
});

// Add error handling for the pool
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Test database connection
pool.connect()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));