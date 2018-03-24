var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var model = require('./models/model.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set("view engine", "ejs");

var mysql = require('mysql');

app.get("/", function(req, res){
  connection = model.createConnection();

  connection.connect(function(err){
    if (err) throw error;
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

  connection = model.createConnection();

  connection.connect(function(err){
    if (err) throw error;
  });

  connection.query('SELECT * FROM salary WHERE first LIKE ? AND last LIKE ?', params, function (err, results) {
    if (err) throw err;
    if (results.length !== 0) {
      res.render("results", {results: results})
    }
    res.render("noResult");
  });

  connection.end();
  // if (firstName === salaries[0]['first'] && lastName === salaries[0]['last']) {
  //   var result = "Last Name: " + salaries[0]['last'] + "\nFirst Name: " + salaries[0]['first'] + "\nSalary: " + salaries[0]['salary'];
  //   res.send(result);
  // }
});

app.get("*", function(req, res){
  res.render("noResult");
});

app.listen(3000, () => console.log('Server has started!'));
