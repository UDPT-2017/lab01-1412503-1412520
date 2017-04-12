var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');

app.use(express.static('public'));
app.use('/components', express.static('bower_components'));

app.engine('hbs', exphbs({}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render('index',{title:"Trang chủ", message:""});
});

app.get('/album', function (req, res) {
    res.render('album',{title:"Album", message:""});
});

app.get('/about', function (req, res) {
    res.render('about',{title:"About", message:""});
});

app.get('/blog', function (req, res) {
    res.render('blog',{title:"Blog", message:""});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
