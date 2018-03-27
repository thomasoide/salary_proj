var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var model = require('./models/model.js');
var mysql = require('mysql');
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var sessionStore = new session.MemoryStore;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());
app.set("view engine", "ejs");
app.all('/express-flash', function( req, res ) {
    req.flash('error', 'Record does not exist');
    res.redirect(301, '/');
});

app.get("/", function(req, res){
  res.render('home');
});

app.get("/:agency", function(req, res) {
  var agency = req.params.agency;

  if (agency === "city") {
    res.render('city');
  }
  else if (agency === "UMSystem") {
    res.render("UMSystem");
  }
  else if (agency === "govt") {
    res.render("govt");
  }
  else if (agency === "cps") {
    res.render("cps");
  }
});

app.post("/:agency/searchDept", function(req, res){
    var firstName = req.body.first;
    var lastName = req.body.last;
    var params = [firstName, lastName];
    var agency = req.params.agency;
    var dept = req.body.select;

    if (req.params.agency == 'city') {
      connection = model.createConnection();

      connection.connect(function(err){
        if (err) throw error;
      });

      connection.query('SELECT * FROM como_employees WHERE Department = ?', dept, function (err, results) {
          if (err) throw err;
          if (results.length !== 0) {
            res.render("CityResults", {results: results});
          }
          else {
            res.render("CityResults", {results: results});
          }
        });

      connection.end();
    }
    else if (req.params.agency == 'govt') {
      connection = model.createConnection();

      connection.connect(function(err){
        if (err) throw error;
      });

      connection.query('SELECT * FROM salary WHERE agency = ?', dept, function (err, results) {
          if (err) throw err;
          if (results.length !== 0) {
            res.render("govtResults", {results: results});
          }
          else {
            res.render("govtResults", {results: results});
          }
        });

      connection.end();
    }
});

app.post("/:agency/searchName", function(req, res){
    var firstName = req.body.first;
    var lastName = req.body.last;
    var params = [firstName, lastName];
    var agency = req.params.agency;
    var dept = req.body.select;

    if(req.params.agency === 'city') {
    connection = model.createConnection();

    connection.connect(function(err){
      if (err) throw error;
    });

    connection.query('SELECT * FROM como_employees WHERE First LIKE ? AND Last LIKE ?', params, function (err, results) {
      if (err) throw err;
      if (results.length !== 0) {
        res.render("CityResults", {results: results});
      }
      else {
        res.render("CityResults", {results: results});
      }
    });
    connection.end();
    }

    else if(req.params.agency === 'govt') {
      connection = model.createConnection();

      connection.connect(function(err){
        if (err) throw error;
      });

      connection.query('SELECT * FROM salary WHERE first LIKE ? AND last LIKE ?', params, function (err, results) {
        if (err) throw err;
        if (results.length !== 0) {
          res.render("govtResults", {results: results});
        }
        else {
          res.render("govtResults", {results: results});
        }
      });
      connection.end();
    }

});

app.get("*", function(req, res){
  res.send("Sorry, page not found");
});

app.listen(3000, () => console.log('Server has started!'));
