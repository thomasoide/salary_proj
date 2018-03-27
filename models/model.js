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


// var obj = {};
// var qsum_total_sales = 'SELECT SUM (total_price) AS s_total_price FROM myrecords';
// var qsum_count_active = 'SELECT COUNT (*) AS s_count_active FROM myrecords WHERE NOT status = "canceled" ';
// var qdata = 'SELECT * FROM myrecords';
//
// router.get('/data', function(req, res) {
//   connection.query(qdata, function(err, result) {
//     if (err) {
//       throw err;
//     } else {
//       obj = {
//         print: result
//       };
//
//       connection.query(qsum_total_sales, function(err, rows, result1) {
//         if (err) {
//           throw err;
//         } else {
//           rsum_total_sales = JSON.parse(rows[0].s_total_price).toFixed(2);
//           console.log(rsum_total_sales);
//
//
//           connection.query(qsum_count_active, function(err, rows2, result2) {
//             if (err) {
//               throw err;
//             } else {
//               rsum_count_active = JSON.parse(rows2[0].s_count_active);
//               console.log(rsum_count_active);
//
//               //After successful completion of all 3 queries send data back to cliend(front-end)
//               //its better to create new obj everytime and send it
//               //store all the data in obj and send back to client
//               var obj = {};
//               obj.print = result;
//               obj.rsum_count_active = rsum_count_active;
//               obj.rsum_total_sales = rsum_total_sales;
//               res.render('data', obj);
//             }
//           });
//         }
//       });
//     }
//   });
//
// });
