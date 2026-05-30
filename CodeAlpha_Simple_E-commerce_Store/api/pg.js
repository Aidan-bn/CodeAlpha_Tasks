const { pg } = require('pg');
const { Client } = require('pg');

//Database connection configuration
const config = {
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: "5433",
  database: "ecommerce"
};

//Postgres client
const client = new Client(config);

//connect to database
client.connect((err) => {
  if(err){
    console.error('Error in connection', err);
    client.end();
    return;
  }
  console.log('Connected to database');

  //Test query to check a postgresql version
  client.query("SELECT VERSION()", [], (err, result) => {
    if (err){
      console.error("Querry execution failled", err);
      client.end();
      return;
    }
  });
})
module.exports = client;
