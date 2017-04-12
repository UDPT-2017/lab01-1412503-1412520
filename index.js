var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
//var path = require('path');

app.use(express.static('public'));
app.use('/components', express.static('bower_components'));
app.engine('hbs', exphbs({}));
app.set('view engine', 'hbs');
//app.set('views', path.join(__dirname,'/views'));

// app.get('/hbs', function (req, res) {
//
//   var pics= function(img, tit, det){
//   	this.img = img;
//   	this.tit = tit;
//   	this.det = det;
//   };
//
//   var images=[ new pics('/image/5.jpg', 'Wishing', 'Detail'),
//   				new pics('/image/6.jpg', 'Waiting', 'Detail'),
//   				new pics('/image/7.jpg', 'Being Serious', 'Detail'),
//   				new pics('/image/8.jpg', 'Suspecting', 'Detail')];
//
//
//   res.render('index', {tit: 'Trang chủ', header: 'Outstanding Albums', sheader: 'New Posts', images: images});
// });
//
// app.get('/album', function(req, res){
//
// 	var albums=function(name, img, creator, view){
// 		this.name = name;
// 		this.img = img;
// 		this.creator = creator;
// 		this.view = view;
// 	};
//
// 	var gallery = [new albums('Cuộc sống dễ dàng 🙂', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
// 					new albums('Cuộc sống dễ dàng 🙂', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
// 					new albums('Cuộc sống dễ dàng 🙂', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
// 					new albums('Cuộc sống dễ dàng 🙂', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
// 					new albums('Cuộc sống dễ dàng 🙂', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100'),
// 					new albums('Cuộc sống dễ dàng 🙂', 'image/13.jpg', 'Nguyễn Hoàng Thi', '100')];
//
// 	res.render('album', {gallery: gallery});
// });

app.get('/hbs', function (req, res) {
    res.render('index',{title:"Trang chủ", message:""});
});

app.get('/album', function (req, res) {
    res.render('album',{title:"Album", message:""});
});
///////////////////////////////////////////////////////////////////////////
app.get('/about', function (req, res) {
    res.render('about',{title:"About", message:""});
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

    // var blog1 = {name:"Thảo Lúa", avatar:"/users/u1.jpg",
    //     views:50, noidung:"Buồn ơi là sầu huhuh sao mà ngu thế này k biết nữa...."};
    // var blog2 = {name:"Thi Thi", avatar:"/users/u3.jpg",
    //     views:55, noidung:"Trời buồn trời đổ cơn mưa ta buồn ta ngủ từ trưa tới chiều...."};
    // var blog =[blog1];
    // blog[blog.length]=blog2;


    // var images= [
    //   '/users/u1.jpg',
    //   '/users/u2.jpg',
    //   '/users/u3.jpg',
    //   '/users/u4.jpg',
    //   '/users/u5.jpg',
    //   '/users/u6.jpg',
    // ]
    // res.render('blog',{title:"Blog", blog:blog});

    res.render('blog',{title:"Blog", blog:blog_array});
});

app.get('/blog-views/blog1', function(req, res){
    res.render('blog-views/blog1',{title:"blog1", message:""});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
