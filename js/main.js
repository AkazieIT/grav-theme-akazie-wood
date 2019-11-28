$(".gallery").lightGallery();

$(document).ready(function() {

  $(window).on('resize',function() {

    $('.gallery').find('article').each(function(i, v){
      let imageheight = $(this).width() * 3/4;
      $(this).css('height', imageheight);
    });
    $('.section-image, .section-map').find('[data-scale]').each(function(i, v){
      let scale = $(this).data('scale');
      let imageheight = $(this).width() * scale;

      $(this).css('height', imageheight);
    });
  }).trigger('resize');


});
