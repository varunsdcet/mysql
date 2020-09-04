var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var url = require('url') ;
var mysql      = require('mysql');
var moment = require('moment');

var con = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'password',
 database : 'varun'
});
io.on('connection', (socket) => {
 socket.on('chat_message', (msg) => {
 //insert
 console.log(msg.msg);
 
 con.connect(function(err) {
 if (err) throw err;
 console.log("Connected!");
 var sql = "INSERT INTO test (name) VALUES ('"+msg.msg+"')";
 con.query(sql, function (err, result) {
   if (err) throw err;
   console.log("1 record inserted");
 });
});
 //insert
   io.emit('chat_message', msg.msg);
 });
});    

http.listen(3000, () => {
 console.log('listening on *:3000');
});