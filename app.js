var express = require('express');
var app = express();
app.set('view engine', 'jade');

app.use('/static/css', express.static(__dirname + '/assets/css/'));

app.get('/', function(req, res) {
	res.render('index', { title: 'Hey'});
});

app.listen(process.env.PORT || 1337);