function reset() {
  $('.hideCroping').hide();
  $('.hideRendering').hide();
  $('.hideRetry').hide();
  $('.sizeWarn').hide();
  $('.hideUploadingMsg').hide();
  $( "#cropAll" ).prop( "disabled", false );
}
reset();

function renderImages(url) {
  $('.hideCroping').hide();
  $('.hideRendering').show();

  var htmlRender = '<div class="col-md-12 col-sm-12 col-xs-12">     <img src="'+ url[1] +'" alt="Cropped Image" />       <a href="'+ url[1] +'"><h5>'+ url[1] +'</h5></a>   </div>  <div class="col-md-12 col-sm-12 col-xs-12">    <img src="'+ url[2] +'" alt="Cropped Image" />      <a href="'+ url[2] +'"><h5>'+ url[2] +'</h5></a>  </div>  <div class="col-md-12 col-sm-12 col-xs-12">    <img src="'+ url[3] +'" alt="Cropped Image" />      <a href="'+ url[3] +'"><h5>'+ url[3] +'</h5></a>  </div>  <div class="col-md-12 col-sm-12 col-xs-12">    <img src="'+ url[4] +'" alt="Cropped Image" />      <a href="'+ url[4] +'"><h5>'+ url[4] +'</h5></a>  </div>';
  $('div.renderHere').html(htmlRender);
}

$('#uploadFile').on('click', function () {
  // $('.hideCroping').hide();
  // $('.hideRendering').hide();
  reset();
  $('#image1Load').click();
});

// $('#image-cropper').cropit();
// $imageCropper.cropit();
$( document ).ready(function() {
    // console.log( "ready!" );
    $('#image-cropper').cropit();
    $('#image-cropper2').cropit();
    $('#image-cropper3').cropit();
    $('#image-cropper4').cropit();

});

$('#image-cropper').cropit(
    {
        onImageLoaded: function() {
            var size = $('#image-cropper').cropit('imageSize');
            if ((size.width == 1024) && (size.height == 1024) ){

              $('.sizeWarn').hide();
              $('.hideCroping').show();
              var data = $("#image-cropper").cropit('imageSrc');
              $("#image-cropper2").cropit('imageSrc', data);
              $("#image-cropper3").cropit('imageSrc', data);
              $("#image-cropper4").cropit('imageSrc', data);
            }
            else {
              console.log("size not suitable");
              $('.sizeWarn').show();
            }

        }
    }
);


$('#cropAll').click(function() {
  $( "#cropAll" ).prop( "disabled", true );
  $('.hideUploadingMsg').show();
  $('.hideRetry').hide();
  var images = {};
  images.a = $('#image-cropper').cropit('export', { type: 'image/jpeg',  originalSize: false });
  images.b = $('#image-cropper2').cropit('export', { type: 'image/jpeg',  originalSize: false });
  images.c = $('#image-cropper3').cropit('export', { type: 'image/jpeg',  originalSize: false });
  images.d = $('#image-cropper4').cropit('export', { type: 'image/jpeg',  originalSize: false });

  $.ajax({
    url: '/uploaded',
    type: 'POST',
    dataType: "json",
    data:JSON.stringify(images),
    contentType: 'application/json',
    processData: false,
    success: function (data) {
      if(data.status == 200){
        renderImages(data.url);
        console.log('Upload sucess!!');
      }
      else {
        console.log('Upload Failed. Retry!');
        $('.hideRetry').show();
        $('.hideUploadingMsg').hide();
        $( "#cropAll" ).prop( "disabled", false );
      }
    },
    error: function (e) {
       console.log(e.message);

     }
  });
});
