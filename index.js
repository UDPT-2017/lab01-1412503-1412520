var express = require('express');

var app = express();
var exphbs  = require('express-handlebars');
// var active = function(home, album, about, blog){
//   this.home=home,this.album=album, this.about=about,this.blog=blog
// }
app.use(express.static('public'));
app.use('/components', express.static('bower_components'));
app.engine('hbs', exphbs({
  extname: '.hbs',
  defaultLayout:'application'
}));

app.set('view engine', 'hbs');


app.get('/about', function (req, res) {
    res.render('about',{
      title:"About",
      helpers: {
        active_about: function () { return "active"; }
      }
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
    "Trời buồn trời đổ cơn mưa ta buồn ta ngủ từ trưa tới chiều....")
    ]
    res.render('blog',{
      title:"Blog",
      blog:blog_array,
      helpers: {
        active_blog: function () { return "active"; }
      }
    });
});

app.get('/blog-views/blog1', function(req, res){
    res.render('blog-views/blog1',{
      title:"blog1",
      layout: "blog_detail",
      helpers: {
        active_blog: function () { return "active"; }
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
  var albumpics = ['image/2.jpg', 'image/3.jpg', 'image/4.jpg', ];
  var images=[ new pics('image/5.jpg', 'Wishing', 'Detail'),
  				new pics('image/6.jpg', 'Waiting', 'Detail'),
  				new pics('image/7.jpg', 'Being Serious', 'Detail'),
  				new pics('image/8.jpg', 'Suspecting', 'Detail')];

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

app.get('/album', function(req, res){

	var albums=function(id, name, img, creator, view){
		this.id = id;
		this.name = name;
		this.img = img;
		this.creator = creator;
		this.view = view;
	};

	var gallery = [new albums('1', 'Cuộc sống dễ dàng :)', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
					new albums('1', 'Cuộc sống dễ dàng :)', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
					new albums('1', 'Cuộc sống dễ dàng :)', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
					new albums('1', 'Cuộc sống dễ dàng :)', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
					new albums('1', 'Cuộc sống dễ dàng :)', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
					new albums('1', 'Cuộc sống dễ dàng :)', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100')];

	res.render('album', {gallery: gallery,
                      tit: 'Bộ sưu tập',
                      active_albums: function () {
                            return "active";
                      }
                      });
  });


app.get('/album-detail', function(req, res){

  var albumName='Cuộc sống dễ dàng :)';
  var albumShort="Something short and leading about the collection below its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.";
  var albumDetail =function(img, uploader, view){
    this.img = img;
    this.uploader = uploader;
    this.view = view;
  };

  var album = [new albumDetail('image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
          new albumDetail('image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
          new albumDetail('image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
          new albumDetail('image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
          new albumDetail('image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
          new albumDetail('image/13.jpg', 'Nguyễn Hoàng Thi', '100')];

  res.render('album-detail', {album: album,
                      albumName: albumName,
                      albumShort: albumShort,
                      active_albums: function () {
                            return "active";
                      }
                      });
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
