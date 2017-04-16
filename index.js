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


var albumModel = require('./model/album');
app.set('view engine', 'hbs');


app.get('/about', function (req, res) {
    res.render('about',{
      title:"About",
      active_about: function () { return "active"; }
    });
});

app.get('/blog', function (req, res) {

    var blog =function(name, avatar, views, noidung){
      this.name = name;
      this.avatar = avatar;
      this.views = views;
      this.noidung = noidung;
    };
    var blog_array=[
    new blog("Thảo Lúa", "/users/u1.jpg",50,
    "Buồn ơi là sầu huhu sao mà ngu thế này k biết nữa...."),
    new blog("Thi Thi", "/users/u3.jpg",55,
    "Trời buồn trời đổ cơn mưa ta buồn ta ngủ từ trưa tới chiều...."),
    new blog("Thi Thi", "/users/u5.jpg",55,
    "Trời buồn trời đổ cơn mưa ta buồn ta ngủ từ trưa tới chiều....")
    ]
    res.render('blog',{
      title:"Blog",
      blog:blog_array,
      active_blog: function () { return "active"; }
    });
});

app.get('/blog-detail', function(req, res){
    res.render('blog-detail',{
      title:"blog1",
      active_blog: function () { return "active"; }
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

/*app.get('/albums', function(req, res){

	var albums=function(id, name, img, creator, view){
		this.id = id;
		this.name = name;
		this.img = img;
		this.creator = creator;
		this.view = view;
	};

  /*
	var gallery = [new albums('1', 'Cuộc sống dễ dàng :)', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
					new albums('2', 'Cuộc sống dễ dàng :)', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
					new albums('3', 'Cuộc sống dễ dàng :)', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
					new albums('4', 'Cuộc sống dễ dàng :)', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
					new albums('5', 'Cuộc sống dễ dàng :)', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
					new albums('6', 'Cuộc sống dễ dàng :)', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100')];
  
	res.render('album', {gallery: gallery,
                      tit: 'Bộ sưu tập',
                      active_albums: function () {
                            return "active";
                      }
                      });
  });*/

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

/*app.get('/albums/:albumid', function(req, res){

  var albumName='Cuộc sống dễ dàng :)';
  var albumShort="Something short and leading about the collection below its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.";
  var albumDetail =function(id, img, uploader, view){
    this.id = id;
    this.img = img;
    this.uploader = uploader;
    this.view = view;
  };

  var picture = [new albumDetail('1', '/image/13.jpg', 'Nguyễn Hoàng Thi', 100),
          new albumDetail('2', '/image/13.jpg', 'Nguyễn Hoàng Thi', 100),
          new albumDetail('3', '/image/13.jpg', 'Nguyễn Hoàng Thi', 100),
          new albumDetail('4', '/image/13.jpg', 'Nguyễn Hoàng Thi', 100),
          new albumDetail('5', '/image/13.jpg', 'Nguyễn Hoàng Thi', 100),
          new albumDetail('6', '/image/13.jpg', 'Nguyễn Hoàng Thi', 100)];

  res.render('album-detail', {picture: picture,
                      albumName: albumName,
                      albumShort: albumShort,
                      active_albums: function () {
                            return "active";
                      }
                      });
});*/


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


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})



