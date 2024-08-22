const { app } = require('@azure/functions');
const { Pool } = require('pg');


// Define the HTTP trigger
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
        port: 5432,
    
  });
  
     
      const client = await pool.connect();

     
      const viewQuery = 'SELECT * FROM sst_work_order'; 

    
      const res = await client.query(viewQuery);

      
      client.release();

      // Process and return the result
      const list = res.rows.map(row => ({
        id: row.id.toString(),
        name: row.name.toString()
      }));

      context.res = {
        status: 200,
        body: list
      };

    } catch (error) {
        context.res = {
                    status: 500,
                    body: { error: error.message }
                  };
    }



//     try {
//         // Create a new pool of clients to manage connections
// const pool = new Pool({
//     user: 'dbuser',
//     host: 'nestit-337',
//     database: 'test',
//     password: 'dbuser',
//     port: 5432,
//     connectionTimeoutMillis: 5000, // Adjust the connection timeout
//     idleTimeoutMillis: 10000, // Adjust the idle timeout
//     max: 20 // Adjust the maximum number of clients in the pool
//   });
//       // Query the database
//       const result = await pool.query('SELECT * FROM sst_type_of_work');

//       // Send the result as a JSON response
//       context.res = {
//         status: 200,
//         body: 'hooo'
//       };
//     } catch (error) {
//       context.res = {
//         status: 500,
//         body: { error: error.message }
//       };
//     }
   }
 }
 );

