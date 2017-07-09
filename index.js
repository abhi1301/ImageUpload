var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'common')));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/uploaded', function ( request, response) {

  var form  = new formidable.IncomingForm();

  form.uploadDir = path.join(__dirname,'/uploaded');

  form.on('file', function(field, file){
    fs.rename(file.path, path.join(form.uploadDir,file.name));
  });

  form.on('error', function (err) {
    console.log('Error: '+ err);
  });

  form.on('end',function () {
    response.end('success');
  });

  form.parse(request);
});

var uploadServer = app.listen(8081, function () {
  console.log('Server started at port 8081');

})
