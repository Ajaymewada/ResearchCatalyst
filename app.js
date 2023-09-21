var express = require('express');
var app = express();
const path = require('path');
const mongoose = require("mongoose");

var swig = require('swig');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'App/views'));

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/Public'));

let username = "ajay";
let password = "fg1egReBjVIUfWyY";
let dbname = "ResearchCatalyst";

mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.kwofl.mongodb.net/${dbname}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

const router = require('./config/routes')
app.use('/', router)
app.get("/*", (req, res) => {
    res.render("index")
})

var server = app.listen(4000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})