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

// $('#image-cropper').cropit();
// $imageCropper.cropit();
$( document ).ready(function() {
    console.log( "ready!" );
    $('#image-cropper').cropit();
    $('#image-cropper2').cropit();

});

// $('#image-cropper').cropit(
//     {
//         onImageLoaded: function() {
//             alert('loaded');
//             var data = $("#image-cropper").cropit('imageSrc');
//             console.log(data);
//         }
//     }
// );

// $("#image-cropper2").cropit('imageSrc',$("#image-cropper").cropit('imageSrc'));

$('.download-btn').click(function() {
  var imageData = $('#image-cropper').cropit('export');
  window.open(imageData);
});
