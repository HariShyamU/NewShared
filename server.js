var express = require('express');
var app = express();
var cors = require("cors");
var bodyParser = require('body-parser');
var pg = require("pg");
import React from 'react';
import { renderToString } from 'react-dom/server';

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var usid=2;
var cuid=0;

app.use(cors())

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/client" + "demo.html" );
})

app.post('/' , urlencodedParser, function (req, res) {
  response = {
     uname:req.body.un,
     pass:req.body.pw
  };

  const config = {
   user: 'postgres',
   database: 'erp',
   password: 'wdwdwdwd',
   port: 5432,
   host:'localhost'
};

 var pool = new pg.Pool(config);


 pool.query('SELECT authid FROM users WHERE name=$1 AND pass=$2',
 [response.uname, response.pass],function(err,result) {
   if(err){
     console.log(err);
     res.status(400).send(err);
   }
   else if (JSON.stringify(result.rows)=="[]") {
     res.status(200).send("Login failed");
   }
   test =JSON.stringify(result.rows);
   var myRegexp = test.match(/\d+/g);
   authid=parseInt(myRegexp);
   console.log(test);
 });

});
app.post('/signup', urlencodedParser, function (req, res) {
   response = {
      uname:req.body.un,
      pass:req.body.pw
   };

   const config = {
    user: 'postgres',
    database: 'erp',
    password: 'wdwdwdwd',
    port: 5432,
    host:'localhost'
};

  var pool = new pg.Pool(config);

  pool.query('INSERT INTO users(id , name, pass) values($1, $2, $3)',
  [usid, response.uname, response.pass],function(err,result) {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    usid=usid+1;
  });
});

app.listen(8000,function(){
  console.log("Started on PORT 8000");
});
