var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');
// var formidable = require('formidable');
// var fs = require('fs');
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
}));

app.use(bodyParser.json({limit: '5mb'}));

app.use(express.static(path.join(__dirname, 'common')));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'views/index.html'));
});

cloudinary.config({
  cloud_name: 'arkam1301',
  api_key: '114711174829612',
  api_secret: 'fGC0zhZM0lH-sm2o5_knNjpXWdQ'
});

app.post('/uploaded', function ( request, response) {

  urls = new Object();
  // urls.a = 'a';
  // urls.b = 'b';
  // urls.c = 'c';
  // console.log(urls);
  var linkCount = 0;
  var errorCount = 0;
  for (i in request.body){
    // console.log("i "+ i);
    // urls.i =" i";
    // console.log(request.body[i]);
    cloudinary.uploader.upload(request.body[i], function(result) {
    if (result.url){
      console.log("link : "+result.url);
      urls.i = result.url;
      linkCount += 1;
    }
    else {
      console.log("error");
      errorCount += 1;
      // response.send(result);
    }
    });
  }
  // while (true) {
  //   if (errorCount > 0) {
  //     console.log("error occured");
  //     response.send('{"failure" : "Update failed", "status" : 205}');
  //     break;
  //   }
  //   else if (linkCount == 4) {
  //     console.log("success");
  //     console.log(urls);
  //     response.send('{"success" : "Updated Successfully", "status" : 200}');
  //     break;
  //   }
  // }
  // console.log(urls);
  response.send('{"success" : "Updated Successfully", "status" : 200}');

});

var uploadServer = app.listen(8081, function () {
  console.log('Server started at port 8081');

})
