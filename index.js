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

  var linkCount = 0;
  var errorCount = 0;
  for (i in request.body){

    cloudinary.uploader.upload(request.body[i], function(result) {
      // console.log(result);
      
    if (result.url){
      console.log("link added: "+i);
      linkCount += 1;
      urls[linkCount] = result.url;
    }
    else {

      errorCount += 1;
      // response.send(result);
    }
    if ((errorCount+linkCount) == 4) {
      if (errorCount) {
          // console.log("error occured");
          response.send('{"status" : 205}');
        }
        else{
          // console.log("success");
          // console.log(urls);
          var result = JSON.stringify({
            status: 200,
            url: urls
          });
          response.send(result);
        }
    }
    });
  }

});

var uploadServer = app.listen(8081, function () {
  console.log('Server started at port 8081');

})
