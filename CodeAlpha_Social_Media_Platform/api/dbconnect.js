const pg = require('pg');
const { Client } = require('pg');

const dbInfo = {
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: "5433",
  database: "chat"
};

const client = new pg.Client(dbInfo);

client.connect((error) => {
  if(error){
    console.error('Error in connection', error);
    client.end();
    return
  }
  console.log('Connected successful');
});
