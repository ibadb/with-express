/**
 * Created by Ibad on 2/26/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var db;
MongoClient.connect('mongodb://ibadpc:mlab@ds161069.mlab.com:61069/with-express', function (err, database) {
    if(err) return console.log(err);

    db = database;
    var server = app.listen(9000, function () {
        console.log('Listening on port %s', server.address().port);
    });
});

app.get('/', function (req, res) {
    var cursor = db.collection('quotes').find();
    cursor.toArray(function (err, result) {
        res.render('index.ejs', { quotes: result });
    });

    //res.sendFile(__dirname + '/index.ejs');
});

// ES6
// app.get('/main', (req, res) => {
//     res.send('Hello World!');
// });

app.post('/quotes', function (req, res) {
    db.collection('quotes').save(req.body, function (err, result) {
       if(err) return console.log(err);

       // console.log('Quotes saved.');
       // res.writeHead(200);
       // res.end();

        res.redirect('/');
    });
});


