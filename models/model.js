//City Employee Salaries of 3/2/18

var mysql = require('mysql');

module.exports = {

  //createsConnection to the database, make sure to input correct DB credentials

  createConnection: function() {
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'JZI0K79qe2Xyonw',
      database : 'new_schema'
    });
    return connection;
  }

}
