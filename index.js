var express = require('express');
var pg = require('pg');
var app = express();
var exphbs  = require('express-handlebars');

var connectionString = 'postgres://postgres:31101996@localhost:5432/'+ 'abmanagement';

app.use(express.static('public'));
app.use('/components', express.static('bower_components'));
app.engine('hbs', exphbs({
  extname: '.hbs',
  defaultLayout:'application'
}));



app.set('view engine', 'hbs');


app.get('/about', function (req, res) {
    res.render('about',{
      tit:"About",
      active_about: function () { return "active"; }
    });
});

var comment =function(user, com){
  this.user = user;
  this.com = com;
};

app.get('/blog', function (req, res) {
  var  client = new pg.Client(connectionString);
  var result = [];
  var blogs = [];
  client.connect();
  var query = client.query('SELECT blogid, username, blogpic, viewnumber, bcontent FROM blog, users WHERE writer = userid', function(err, result){
    blogs = result.rows;
    console.log(result.rows);
    res.render('blog',{
      tit:"Blog",
      blog:blogs,
      active_blog: function () { return "active"; }
    });
  });
});

  var squel = require("squel");
  var log = require("log");

app.get('/blog/:id', function(req, res){
  var blog;
  var  client = new pg.Client(connectionString);
  var result = [];
  var result_cmt = [];
  var blogs = [];
  var comments = [];

  client.connect();
  var query = client.query('SELECT blogid, username, blogpic, viewnumber, bcontent FROM blog, users WHERE writer = userid', function(err, result){
    blogs = result.rows;
    console.log(result.rows);
    for(var i = 0; i<blogs.length; i++){
      if(blogs[i].blogid == req.params.id){
        blog = blogs[i];
        break;
      }
    }

    if(blogs!=null){
      var query2 = client.query('select username, cmt from users, commentt where commentt.userid = users.userid and commentt.blogid =' + blog.blogid , function(err, result_cmt){
      // var query2 = client.query(q2, function(err, result_cmt){
        comments = result_cmt.rows;
        console.log(result_cmt.rows);
        res.render('blog-detail',{
          blog:blog,
          comments: comments,
          tit:"Blog" + blog.blogid,
          active_blog: function () { return "active"; }
        });
      });
      var query3 = client.query('update blog set viewnumber=viewnumber+1 where blog.blogid =' + blog.blogid , function(err, result){
        console.log(result);
        });
    }
    });
  });

/////////////////////////////////////////////////////////
app.get('/', function (req, res) {
  var pics= function(img, tit, det){
  	this.img = img;
  	this.tit = tit;
  	this.det = det;
  };
  var albumpics = ['/image/2.jpg', '/image/3.jpg', '/image/4.jpg', ];
  var images=[ new pics('/image/5.jpg', 'Wishing', 'Detail'),
  				new pics('/image/6.jpg', 'Waiting', 'Detail'),
  				new pics('/image/7.jpg', 'Being Serious', 'Detail'),
  				new pics('/image/8.jpg', 'Suspecting', 'Detail')];

  res.render('index', {tit: 'Trang chủ',
                      header: 'Outstanding Albums',
                      sheader: 'New Posts',
                      images: images,
                      albumpics: albumpics,
                      pickedpic: 'image/1.jpg',
                      active_index: function () {
                        return "active";
                      }
});
});


app.get('/albums', function(req, res){


  var  client = new pg.Client(connectionString);
  var result = [];
  var gallery = [];



  client.connect();

  var query = client.query('SELECT album.albumid, album.title, users.username, album.pic, SUM(picture.viewNumber) as S FROM album, picture, users WHERE creator = userid AND album.albumid = picture.albumid GROUP BY album.albumid, creator, album.pic, album.title, users.username', function(err, result){
                gallery = result.rows;
                console.log(result.rows);
                res.render('album', {gallery: gallery,
                            tit: 'Bộ sưu tập',
                             active_albums: function () {
                            return "active";
                            },
                      });});



  });


app.get('/albums/:albumid', function(req, res){

  var client = new pg.Client(connectionString);
   var result = [];
  var picture = [];
  var albumName = undefined;
  var albumShort = undefined;



  client.connect();

  var query = client.query('SELECT * FROM album, picture, users WHERE album.albumid = picture.albumid AND picture.uploader = users.userID AND picture.albumid = ' + req.params.albumid, function(err, result){
        picture = result.rows;
        albumName = picture[0].title;
        albumShort = picture[0].acontent;
        console.log(picture);
        res.render('album-detail', {picture: picture,
                      albumName: albumName,
                      albumShort: albumShort,
                      active_albums: function () {
                            return "active";
                      }
                      });
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example listening!');


})
