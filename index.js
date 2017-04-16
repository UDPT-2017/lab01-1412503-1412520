var express = require('express');
var pg = require('pg');
var app = express();
var exphbs  = require('express-handlebars');

var connectionString = 'postgres://fnytwqljxvlgih:f4310f8c234608a6f02acf7105269edd408c354a3928c182d925d68577e3a041@ec2-54-225-182-108.compute-1.amazonaws.com:5432/d8prbaqobhvhrr';

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
    //console.log(result.rows);
    res.render('blog',{
      tit:"Blog",
      blog:blogs,
      active_blog: function () { return "active"; }
    });
  });
});


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
    //console.log(result.rows);
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
        //console.log(result);
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

  var albumpics = [];
  var images = [];

   var  client = new pg.Client(connectionString);

  client.connect();

  var query1 = client.query('SELECT DISTINCT pic FROM album LIMIT 4', function(err, result){
      albumpics = result.rows;
      console.log(albumpics);
  });

  if (albumpics != null)
  {
    var query2 = client.query('SELECT blogpic, bcontent, username FROM blog, users WHERE blog.writer = users.userid LIMIT 4', function(err, result){
      images = result.rows;
      //console.log(images);
      var pickedpic = albumpics[3].pic;
      res.render('index', {tit: 'Trang chủ',
                      header: 'Outstanding Albums',
                      sheader: 'New Posts',
                      images: images,
                      albumpics: albumpics,
                      pickedpic: pickedpic,
                      active_index: function () {
                        return "active";
                      }});
  });
  }

});


app.get('/albums', function(req, res){


  var  client = new pg.Client(connectionString);
  var result = [];
  var gallery = [];



  client.connect();

  var query1 = client.query('SELECT album.albumid, album.title, users.username, album.pic, SUM(picture.viewNumber) as S FROM album, picture, users WHERE creator = userid AND album.albumid = picture.albumid GROUP BY album.albumid, creator, album.pic, album.title, users.username', function(err, result){

                gallery = result.rows;
                //console.log(result.rows);
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

  var query2 = client.query('SELECT * FROM album, picture, users WHERE album.albumid = picture.albumid AND picture.uploader = users.userID AND picture.albumid = ' + req.params.albumid, function(err, result){
        picture = result.rows;
        albumName = picture[0].title;
        albumShort = picture[0].acontent;
        //console.log(picture);
        res.render('album-detail', {picture: picture,
                      albumName: albumName,
                      albumShort: albumShort,
                      active_albums: function () {
                            return "active";
                      }
                      });
  });

});

app.get('/albums/:albumid/:picid', function(req, res){

  var client = new pg.Client(connectionString);

  var result =[];

  client.connect();


  var query3 = client.query('UPDATE picture SET viewnumber = viewnumber + 1 WHERE picture.picid = $1', [req.params.picid], function(err, result){
     res.render('photo', {pic: req.params.picid,
                      active_albums: function () {
                            return "active";
                      }  });
  });

});



app.listen(process.env.PORT||3000, function () {
  console.log('Example app listening on port 3000!');
});
