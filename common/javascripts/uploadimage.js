$('#selectImage').on('change', function () {

  var image = $(this).get(0).files;

  if (image.length > 0) {
    var imageData = new FormData();
    var file = image[0];
    imageData.append('uploadImage',file, file.name);

    $.ajax({
      url: '/uploaded',
      type: 'POST',
      data: imageData,
      contentType: false,
      processData: false,
      success: function (data) {
        console.log('uploaded successfully..');
      },
      error: function (e) {
         alert('error ' + e.message);
       }
    });
  }

});
$('#uploadFile').on('click', function () {
  $('.hideCroping').hide();
  $('#image1Load').click();
});
$('.hideCroping').hide();
// $('#image-cropper').cropit();
// $imageCropper.cropit();
$( document ).ready(function() {
    console.log( "ready!" );
    $('#image-cropper').cropit();
    $('#image-cropper2').cropit();
    $('#image-cropper3').cropit();
    $('#image-cropper4').cropit();

});

$('#image-cropper').cropit(
    {
        onImageLoaded: function() {
            var size = $('#image-cropper').cropit('imageSize');
            console.log(true && true);
            console.log((size.width >= 1024) && (size.height >= 1024));
            console.log(size.height >= 1024);
            if ((size.width >= 1024) && (size.height >= 1024) ){
              console.log("yoyo");
              $('.hideCroping').show();
              var data = $("#image-cropper").cropit('imageSrc');
              $("#image-cropper2").cropit('imageSrc', data);
              $("#image-cropper3").cropit('imageSrc', data);
              $("#image-cropper4").cropit('imageSrc', data);
            }
            else {
              console.log("size not suitable");
            }

        }
    }
);

// $("#image-cropper2").cropit('imageSrc',$("#image-cropper").cropit('imageSrc'));

$('#cropAll').click(function() {
  // var imageData = $('#image-cropper').cropit('export');
  // window.open(imageData);
  // var imageData = $('#image-cropper').cropit('export');
//   window.open($('#image-cropper').cropit('export', { type: 'image/jpeg',  originalSize: true }));
//   window.open($('#image-cropper2').cropit('export', {
//   type: 'image/jpeg',
//   originalSize: true
// }));
//   window.open($('#image-cropper3').cropit('export', {
//   type: 'image/jpeg',
//   originalSize: true
// }));
//   window.open($('#image-cropper4').cropit('export'), {
//   type: 'image/jpeg',
//   originalSize: true
// });
  var images = {};
  images.a = $('#image-cropper').cropit('export', { type: 'image/jpeg',  originalSize: false });
  images.b = $('#image-cropper2').cropit('export', { type: 'image/jpeg',  originalSize: false });
  images.c = $('#image-cropper3').cropit('export', { type: 'image/jpeg',  originalSize: false });
  images.d = $('#image-cropper4').cropit('export', { type: 'image/jpeg',  originalSize: false });

  // console.log(images);
  // var jstring = new Object();
  // jstring.name = 'abhishek';
  // jstring.pass = 'abhi1301';
  // console.log(jstring);
  // console.log(JSON.stringify(jstring));

  $.ajax({
    url: '/uploaded',
    type: 'POST',
    dataType: "json",
    data:JSON.stringify(images),
    contentType: 'application/json',
    processData: false,
    success: function (data) {
      console.log('uploaded successfully..');
    },
    error: function (e) {
       console.log(e.message);
     }
  });
});
