$(".gallery").lightGallery();

$('.pull').click(function() {
  $(this).toggleClass('open');
  if($(this).hasClass('open')){
    $('.header-nav.mobile').show().attr('aria-hidden', 'false');
    $('.content, .footer, .screen-image').hide();
    $('.page-header').attr('menu', 'open');
  } else {
    $('.header-nav.mobile').hide().attr('aria-hidden', 'true');
    $('.content, .footer, .screen-image').show();
    $('.page-header').attr('menu', 'close');
  }
});

$(document).ready(function() {

  $(window).on('resize',function() {

    let youtube = $('.youtube-iframe');
    let youtubeheight = youtube.width() * 10/16;
    $('.youtube-iframe').css('height', youtubeheight);

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
