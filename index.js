var express = require('express');

var app = express();
var exphbs  = require('express-handlebars');

app.use(express.static('public'));
app.use(express.static('public/albums'));
app.use('/components', express.static('bower_components'));

app.engine('hbs', exphbs({}));
app.set('view engine', 'hbs');



app.get('/hbs', function (req, res) {


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

  
  res.render('index', {tit: 'Trang chủ', header: 'Outstanding Albums', sheader: 'New Posts', images: images, albumpics: albumpics, pickedpic: 'image/1.jpg'});
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

	res.render('album', {gallery: gallery});
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})