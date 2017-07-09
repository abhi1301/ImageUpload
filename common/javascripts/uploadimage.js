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
