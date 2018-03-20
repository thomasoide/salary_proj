var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set("view engine", "ejs");

var mysql = require('mysql');

function connect() {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'G0DUCKS15t!',
    database : 'new_schema'
  });
  return connection;
}

app.get("/", function(req, res){
  connection = connect();

  connection.connect(function(err){
    if (err) throw error;
    // console.log('You are connected to the database');
  });

  connection.query('SELECT DISTINCT(agency) FROM salary;', function (err, results) {
    if (err) throw err;
    res.render("home", {results: results});
  });

  connection.end();
});

app.post("/search", function(req, res){
  var firstName = req.body.first;
  var lastName = req.body.last;
  var params = [firstName, lastName];

  connection = connect();

  connection.connect(function(err){
    if (err) throw error;
    // console.log('You are connected to the database');
  });

  connection.query('SELECT * FROM salary WHERE first LIKE ? AND last LIKE ?', params, function (err, results) {
    if (err) throw err;
    res.render("results", {results: results})
  });

  connection.end();
  // if (firstName === salaries[0]['first'] && lastName === salaries[0]['last']) {
  //   var result = "Last Name: " + salaries[0]['last'] + "\nFirst Name: " + salaries[0]['first'] + "\nSalary: " + salaries[0]['salary'];
  //   res.send(result);
  // }
});

app.get("*", function(req, res){
  res.send("Sorry, page not found.");
});

app.listen(3000, () => console.log('Server has started!'));
