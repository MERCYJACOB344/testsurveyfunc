const { app } = require('@azure/functions');
const { Pool } = require('pg');

app.http('GetData', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log(`Http function processed request for URL: "${request.url}"`);

    try {
      const pool = new Pool({
        user: 'dbuser',
        host: 'nestit-337',
        database: 'test',
        password: 'dbuser',
        port: 5432
      });
      
      const client = await pool.connect();

      // Query to list all tables in the public schema
      const tableQuery = 'SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\'';

      const res = await client.query(tableQuery);

      client.release();

      // Process and return the result
      const tables = res.rows.map(row => row.table_name);

      context.res = {
        status: 200,
        body: tables,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://yellow-river-047162a1e.5.azurestaticapps.net', // Your frontend URL
          'Access-Control-Allow-Credentials': 'true'
        },
      };

    } catch (error) {
      context.res = {
        status: 500,
        body: { error: error.message }
      };
    }
  }
});
