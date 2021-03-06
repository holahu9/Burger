const mysql = require('mysql');
var connection;

// setup for deployment to Heroku and JawsDB 
if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
  // if local then set connection as follows
  connection = mysql.createConnection({
    host: 'sql5.freemysqlhosting.net',
    user: 'sql5397080',
    password: 'wDuiLJJjd6',
    database: 'sql5397080',
  });
}

connection.connect((err) => {
    if (err) {
      console.error(`error connecting: ${err.stack}`);
      return;
    }
    console.log(`connected as id ${connection.threadId}`);
  });

// Export connection for ORM to use
module.exports = connection;