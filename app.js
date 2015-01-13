var express = require('express');
var app = express();
app.set('view engine', 'jade');

app.use('/static/css', express.static(__dirname + '/assets/css/'));
app.use('/static/js', express.static(__dirname + '/assets/js/'));

app.get('/', function(req, res) {
	res.render('index', { title: 'Hey'});
});

app.get('/game', function(req, res) {
	res.render('game');
});

app.listen(process.env.PORT || 1337);