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
app.use(express.static('views'));
app.use(cookieParser('keyboard cat'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));

app.use(flash());
app.set("view engine", "ejs");
app.all('/express-flash', function(req, res) {
    req.flash('error', 'Record does not exist');
    res.redirect(301, '/:agency/:search/');
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
});

app.get("/UMSystem/:campus", function(req, res) {
  var campus = req.params.campus;
  console.log(campus);

  if (campus === 'COLUM') {
    res.render("colum");
  }
  else if (campus === "HOSPT") {
    res.render('hospt');
  }
  else if (campus === 'KCITY') {
    res.render('umkc');
  }
  else if (campus === 'ROLLA') {
    res.render('rolla');
  }
  else if (campus === 'STLOU') {
    res.render('umsl');
  }
  else if (campus === 'UMSYS') {
    res.render('umsys');
  }
});

app.post("/:agency/searchDept", function(req, res){
    var firstName = req.body.first;
    var lastName = req.body.last;
    var params = [firstName, lastName];
    var agency = req.params.agency;
    var dept = req.body.select;
    var campus = req.body.campus;
    var umsystem = [dept, campus];

    if(req.params.agency === 'city') {

      model.query('SELECT * FROM como_employees WHERE Department = ?', dept, function (err, results) {
        if (err) throw err

        else if (results.length !== 0){
          res.render("CityResults", {results: results});
        }
        else {
          res.render("CityNoResult", {results: results});
        }
      });
    }
    else if (req.params.agency == 'govt') {

      model.query('SELECT * FROM salary WHERE agency = ?', dept, function (err, results) {
        if (err) throw err

        else if (results.length !== 0){
          res.render("govtResults", {results: results});
        }
        else {
          res.render("govtNoResults", {results: results});
        }
      });
    }
    /* else if (req.params.agency == 'UMSystem' && campus === 'default') {

      model.query('SELECT * FROM UM-Salaries WHERE unit = ? AND department = ?', umsystem, function (err, results) {
        if (err) throw err

        else if (results.length !== 0){
          res.render("UMSystemResults", {results: results});
        }
        else {
          res.render("UMSystemNoResults", {results: results});
        }
      });

    }
    else if (req.params.agency == 'UMSystem' && campus.length !== 'default') {
      model.query('SELECT * FROM UM-Salaries WHERE unit = ? AND department = ?', umsystem, function (err, results) {
        if (err) throw err

        else if (results.length !== 0){
          res.render("UMSystemResults", {results: results});
        }
        else {
          res.render("UMSystemNoResults", {results: results});
        }
      });

    } */
});

app.post("/:agency/searchName", function(req, res) {
    var firstName = req.body.first;
    var lastName = req.body.last;
    var params = [firstName, lastName];
    var agency = req.params.agency;
    var dept = req.body.select;
    var campus = req.body.campus;
    var umsystem = [firstName, lastName, campus];

    if(req.params.agency === 'city') {

      model.query('SELECT * FROM como_employees WHERE First LIKE ? AND Last LIKE ?', params, function(err, results) {
        if (err) throw err
        else if (results.length !== 0){
          res.render("CityResults", {results: results});
        }
        else {
          res.render("CityNoResult", {results: results});
        }
      });

    }

    else if(req.params.agency === 'govt') {

      model.query('SELECT * FROM salary WHERE first LIKE ? AND last LIKE ?', params, function(err, results) {
        if (err) throw err;
        else if (results.length !== 0) {
          res.render("govtResults", {results: results});
        }
        else {
          res.render("govtNoResults", {results: results});
        }
      });

    }

    else if (req.params.agency == 'UMSystem' && campus === 'default') {

      // var connection = model.createConnection();
      //
      // connection.connect(function(err){
      //   if (err) throw error;
      // });
      //
      // connection.query('SELECT * FROM UM_Salaries WHERE first LIKE ? AND last LIKE ?', params, function (err, results) {
      //   if (err) throw err;
      //   else if (results.length !== 0){
      //     res.render("UMSystemResults", {results: results});
      //   }
      //   else {
      //     res.render("UMSystemNoResults", {results: results});
      //   }
      // });
      //
      // connection.end();

      model.query('SELECT * FROM UM_Salaries WHERE first LIKE ? AND last LIKE ?', params, function (err, results) {
        if (err) throw err

        else if (results.length !== 0){
          res.render("UMSystemResults", {results: results});
        }
        else {
          res.render("UMSystemNoResults", {results: results});
        }
      });

    }

    else if (req.params.agency == 'UMSystem' && campus.length !== 'default') {

      model.query('SELECT * FROM UM_Salaries WHERE first LIKE ? AND last LIKE ? AND unit = ?', umsystem, function (err, results) {
        if (err) throw err

        else if (results.length !== 0){
          res.render("UMSystemResults", {results: results});
        }
        else {
          res.render("UMSystemNoResults", {results: results});
        }
      });

    }

});

app.get("*", function(req, res){
  res.send("Sorry, page does not exist");
});

app.listen(3000, () => console.log('Server has started!'));
