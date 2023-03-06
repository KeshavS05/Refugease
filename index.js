#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();

var mysql = require('mysql');

app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(
    express.static('static_files')
)

app.use(require('cookie-session')({
  name: 'tos-accepted',
  keys: ['U3RiNkwDxFxr9BPPYEzP']
}));

app.use(require('cookie-parser')());

var sql_params = {
  connectionLimit : 10,
  user            : process.env.DIRECTOR_DATABASE_USERNAME,
  password        : process.env.DIRECTOR_DATABASE_PASSWORD,
  host            : process.env.DIRECTOR_DATABASE_HOST,
  port            : process.env.DIRECTOR_DATABASE_PORT,
  database        : process.env.DIRECTOR_DATABASE_NAME
}

const home = require('./routes/home.js')
app.use(home);

app.use('/cookies', require('./routes/cookieclicker.js'))

app.use('/oauth', require('./routes/oauth.js'))

app.use('/hacktj', require('./routes/refugease.js'))

const wordle = require('./routes/wordle.js')
app.use('/wordle', wordle)

const math_facts = require('./routes/math_facts.js')
app.use('/numbers', math_facts)

const weather = require('./routes/weather.js')
app.use('/weather', weather)

app.locals.pool  = mysql.createPool(sql_params);
app.use('/voting', require('./routes/basicsql_router.js'))

app.get('/', function(req, res){
    res.render('home')
});
app.get('/schedule', function(req,res){
    let schedule = {
    "count": 110,
    "next": "https://ion.tjhsst.edu/api/schedule?page=5",
    "previous": "https://ion.tjhsst.edu/api/schedule?page=3",
    "results": [
        {
            "url": "https://ion.tjhsst.edu/api/schedule/2022-09-01",
            "date": "2022-09-01",
            "day_type": {
                "name": "Blue Day",
                "special": false,
                "blocks": [
                    {
                        "order": 1,
                        "name": "Period 1",
                        "start": "8:40",
                        "end": "10:15"
                    },
                    {
                        "order": 2,
                        "name": "Period 2",
                        "start": "10:25",
                        "end": "12:00"
                    },
                    {
                        "order": 3,
                        "name": "Lunch",
                        "start": "12:00",
                        "end": "12:40"
                    },
                    {
                        "order": 4,
                        "name": "Period 3",
                        "start": "12:40",
                        "end": "14:15"
                    },
                    {
                        "order": 5,
                        "name": "Period 4",
                        "start": "14:25",
                        "end": "16:00"
                    }
                ]
            }
        }
    ]
}

    schedule.results[0].day_type.blocks.forEach(function(elem){
        console.log(elem.name)
    })
    res.render('schedule', schedule)
});
app.get('/flip', function(req,res){
    let chance = Math.floor(Math.random() * (2 - 0) + 0);
    var obj;
    if(chance===0){
        res.render('lose')
        obj = 'lose'
    }
    else{
        res.render('win')
        obj = 'win'
    }
    console.log(obj)
});

// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});