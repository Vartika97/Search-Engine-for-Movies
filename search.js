var mysql = require('mysql');
var express = require('express');
var app = express();
var lodash=require('lodash');
var _ = require('underscore');
var uniqBy = require('lodash.uniqby');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
app.post('/search', function(req, res) {
 res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    res.setHeader('Access-Control-Allow-Methods', 'POST');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  var movie=req.body.va;
  console.log(movie);
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",

  password: "akash123",
   database: "Search"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var query ="SELECT * FROM `TABLE 2` WHERE `Movie_Name` REGEXP '^"+movie+"$' LIMIT 10";
  con.query(query, function (err, result) {
    if (err) console.log(err);
    
else
{
 var a=result;
   if(a.length<10)
{  
var query1 ="SELECT * FROM `TABLE 2` WHERE FIND_IN_SET('"+movie+"',`Alt_Text`) LIMIT "+(10-a.length);
con.query(query1, function (err, result1) {
    if (err) console.log(err);
else
{
    a=a.concat(result1);
    a=uniqBy(a,"Movie_Name");
        if(a.length<10)
{ 
 var query2 ="SELECT * FROM `TABLE 2` WHERE `Movie_Name` REGEXP '"+movie+"' LIMIT "+(10-a.length);
con.query(query2, function (err, result1) {
    if (err) console.log(err);
else
{
   a=a.concat(result1);
    a=uniqBy(a,"Movie_Name");
if(a.length<10)
{
var query3="SELECT * FROM `TABLE 2` WHERE SOUNDEX(`Movie_Name`) = SOUNDEX('"+movie+"') LIMIT "+(10-a.length);
con.query(query3, function (err, result1) {
    if (err) console.log(err);
    a=a.concat(result1);
    a=uniqBy(a,"Movie_Name");
  res.json({name:(a)});
con.end();
});
}
else
  res.json({name:(a)});

}
});
}
else
{
   res.json({name:(a)});
}
}
});
}
else
{
   res.json({name:(a)});
}
}

  });
}); 
});
app.listen(8080, function() {
  console.log('Server is running');
});


