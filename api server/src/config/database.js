const sql = require('mssql');
const setup = require('./setup.js');
const sqlInit = setup.sqlInit;

var config = {
    server: sqlInit.sqlIp,
    port: sqlInit.sqlPort,
    user: sqlInit.sqlUser,
    password: sqlInit.sqlPassword,
    database: sqlInit.sqlDatabase
};

const db = new sql.connect(config, (err) => {
    if (err) {
      console.log(err);
    } else {
          var request = new sql.Request();
          // query to the database and get the records
          request.query('select getdate = convert(varchar(30), getdate(), 109)', function (err, result) {
          
          if (err) {
              console.log(err)
          } else {
              console.dir(result.recordset[0].getdate)
          }
          
      });
    }
});

module.exports = db;

