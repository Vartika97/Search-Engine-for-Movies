var express=require('express');
var app=express();
var mysql=require('mysql');
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : 'akash123',
database : 'Search'
});
connection.connect();

app.get('/complete',function(req,res){
 res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    res.setHeader('Access-Control-Allow-Methods', 'POST');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
connection.query('SELECT `Movie_Name` from `TABLE 2` where `Movie_Name` like "%'+req.query.key+'%"',
function(err, rows, fields) {
if (err) throw err;
var data=[];
for(i=0;i<rows.length;i++)
{
data.push(rows[i].Movie_Name);
}
console.log(JSON.stringify(data));
res.end(JSON.stringify(data));
});
});
app.listen(8080,function(){
console.log("We have started our server on port 3000");
});

