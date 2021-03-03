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
  /*  e.preventDefault(); if kleiner als 992 */


    if($('body').hasClass('navexpanded')) {
      if ($(window).width() < 992 && $(this).hasClass('onlymobile')) {
        e.preventDefault();
      }
      $(this).find('.minussign').toggle();
      $(this).find('.plussign').toggle();

      $(this).parent().find('.nav-lvl2').toggle();

    }else{
      e.preventDefault();
      $(this).parent().find('.nav-lvl2').toggle();

    }


  }
});

$('#scrolltopbutton').click(function(e){
  e.preventDefault();

    $('html, body').animate({
        scrollTop: 0
    }, 2000);
});

$(document).ready(function() {

paddingImages();

/* IOS BG Hack */
if(window.innerWidth < 800 && $('.wrapper').css('background-image')) {
  $('head').append('<style>.wrapper::before {background-image: '+ $('.wrapper').css('background-image') +';}</style>');
  $('.wrapper').css('background-color', 'transparent');
  $('.wrapper').css('background-image', 'none');
  /*
  $('.site-header').css('background-color', 'transparent');
  $('.site-header').css('background-image', 'none');
  */
}



  $(window).scroll(function() {
     if($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
       $('.upfootertext').show();
     }
     if($(window).scrollTop() + $(window).height() < $(document).height() - 300) {
       $('.upfootertext').hide();
     }
  });
/*
  var subActive = $('nav.mobile .nav-lvl2').find('.active');
  if(subActive.length){
    $(subActive).closest('ul').show();
  }
*/
  $( "nav.mobile > .nav-lvl1 > li > a" ).each( function(){
/*    alert($(this).html()); */
    if($(this).hasClass('active')) {

      if($(this).parent().has('.nav-lvl2').length){

        $(this).parent().find('.nav-lvl2').show();
        if($('body').hasClass('navexpanded')) {
          $(this).find('.minussign').toggle();
          $(this).find('.plussign').toggle();
        }
      }

    }


  } );

  $(window).on('resize',function() {

    let youtube = $('.youtube-iframe');
    let youtubeheight = youtube.width() * 10/16;
    $('.youtube-iframe').css('height', youtubeheight);

    $('.gallery').find('article').each(function(i, v){
      scale = $(this).data('scale');
      let imageheight = $(this).width() * scale;
      $(this).css('height', imageheight);
    });
  /*  $('.section-image, .section-map').find('[data-scale]').each(function(i, v){ */
    $('.section-map').find('[data-scale]').each(function(i, v){
      let scale = $(this).data('scale');
      let imageheight = $(this).width() * scale;

      $(this).css('height', imageheight);
    });
  }).trigger('resize');

  osm();

  paddingImages();


});


function paddingImages() {
if(window.innerWidth > 869) {
  $('section.section-modular').find('div.row').each(function() {
    console.log($(this).children().length );
      $(this).children('article.col-md-6:nth-child(odd)').children('.media-container').each(function() {
        $(this).css('padding-right',$(this).data('padding'));
      });
      $(this).children('article.col-md-6:nth-child(even)').children('.media-container').each(function() {
        $(this).css('padding-left',$(this).data('padding'));
      });
  });
}

}
