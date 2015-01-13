var express = require('express');
var app = express();
app.set('view engine', 'jade');


app.get('/', function(req, res) {
	res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(process.env.PORT || 1337);