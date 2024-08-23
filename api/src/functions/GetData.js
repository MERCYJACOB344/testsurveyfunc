const { app } = require('@azure/functions');
const { Pool } = require('pg');

app.http('GetData', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log(`Http function processed request for URL: "${request.url}"`);

    try {
      // Configure the database connection pool
      const pool = new Pool({
        user: 'dbuser',
        host: 'nestit-337',
        database: 'test',
        password: 'dbuser',
        port: 5432            // Default PostgreSQL port
      });
      
      // Connect to the database
      const client = await pool.connect();
      
      // Define the SQL query to select rows from the table
      const query = 'SELECT * FROM sst_work_order'; // Replace 'sst_work_order' with your table name

      // Execute the query
      const result = await client.query(query);

      // Release the client back to the pool
      client.release();

      // Process and return the result
      const rows = result.rows; // Array of rows
      context.log('Query result:', rows);

      context.res = {
        status: 200,
        body: rows,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000"
        }
      };

    } catch (error) {
      // Handle and log errors
      context.log.error('Error occurred:', error);
      context.res = {
        status: 500,
        body: { error: error.message }
      };
    }
  }
});
