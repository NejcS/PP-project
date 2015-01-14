var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var ResultsSchema = new mongoose.Schema({ result: Number });
var Results = mongoose.model('Results', ResultsSchema);


app.set('view engine', 'jade');

app.use('/static/css', express.static(__dirname + '/assets/css/'));
app.use('/static/js', express.static(__dirname + '/assets/js/'));
app.use('/static/img', express.static(__dirname + '/assets/img/'));


app.get('/', function(req, res) {
	res.render('index', { title: 'Hey'});
});

app.get('/game1', function(req, res) {
	res.render('game');
});

app.get('/game2', function(req, res) {
	res.render('game2');
});

app.get('/game3', function(req, res) {
	res.render('game3');
});

app.get('/home', function(req, res) {
	res.render('home', {level: 4});
});

app.get('/results', function(req, res) {
	Results.find({}, function(err, rezultati) {
		var data = [];

		rezultati.forEach(function(rezultat){
			data.push(rezultat);
		});

		res.send(data);
	});
});

app.post('/result', function(req, res){
	var data = new Results( {result: req.body} );

	console.log(req.body);

	data.save( function(error, datas) {
		if (error) {
			res.json(error);
		} else {
			res.redirect('/home');
		}
	});
});

app.listen(process.env.PORT || 1337);