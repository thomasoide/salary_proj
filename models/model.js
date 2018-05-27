//City Employee Salaries of 3/2/18

var mysql = require('mysql');

module.exports = {

  query: function(query, params, callback) {

    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'JZI0K79qe2Xyonw',
      database : 'new_schema'
    });

    connection.connect(function(err){
      if (err) throw error;
    });

    connection.query(query, params, function (err, results) {
      if (err) throw err;
      else {
        callback(null, results);
      }
    });

    connection.end();

  }
}
