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

$('.nav-lvl1 > li > a').click(function(e){
  if($(this).parent().has('.nav-lvl2').length){
    e.preventDefault();
    $(this).parent().find('.nav-lvl2').toggle();
  }
});

$(document).ready(function() {

  var subActive = $('nav.mobile .nav-lvl2').find('.active');
  if(subActive.length){
    $(subActive).closest('ul').show();
  }

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

  osm();

});
