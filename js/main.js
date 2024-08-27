$(".gallery").lightGallery();

$('.pull').click(function() {

menuClick('.pull');


});

$('.stickybottommenu').click(function() {

  menuClick('.stickybottommenu');

});

$('.stickybottomtoggle').click(function() {

  menuClick('.stickybottommenu');

});

$('.oz-filteritem').each(function() {
  $(this).css('cursor', 'pointer');

  $(this).click(function() {
    if($(this).data('clickme')) { window.location = $(this).data('clickme'); }
  });
});

function footerHeight() {
  if($(window).width() < 870) {
    if($('.footer-main .footerpage').data('footerheightm')) { $('.footer-main .footerpage').css('height', $('.footer-main .footerpage').data('footerheightm'));}
  } else {
    if($('.footer-main .footerpage').data('footerheightd')) { $('.footer-main .footerpage').css('height', $('.footer-main .footerpage').data('footerheightd'));}
  }
}

function menuClick(menuSelector) {

  $(menuSelector).toggleClass('open');
  if($(menuSelector).hasClass('open')){
    if($('.stickybottom').find(menuSelector).length == 1) { $('header').addClass('fixed');  $('.stickybottomtoggle').show(); }
    $('.header-nav.mobile').css('display', 'flex').attr('aria-hidden', 'false');
    $('.content, .footer, .screen-image').hide();
    $('.page-header').attr('menu', 'open');

    $('body').addClass('navisopen');
  } else {
    if($('.stickybottom').find(menuSelector).length == 1) { $('header').removeClass('fixed'); $('.stickybottomtoggle').hide();}
    $('.header-nav.mobile').css('display', 'none').attr('aria-hidden', 'true');
    $('.content, .footer, .screen-image').show();
    $('.page-header').attr('menu', 'close');
    $('body').removeClass('navisopen');
  }


}

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
footerHeight();

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

      paddingImages();
      footerHeight();
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

  if (typeof osm === "function") {
      osm();
  }



});


function paddingImages() {
if(window.innerWidth > 869) {
  $('section.section-modular').find('div.row').each(function() {
      $(this).children('article.col-md-6:nth-child(odd)').children('.media-container').each(function() {
        $(this).css('padding-right',$(this).data('padding'));
      });
      $(this).children('article.col-md-6:nth-child(odd)').children('.caption_2').each(function() {
        $(this).addClass('padright');
      });
      $(this).children('article.col-md-6:nth-child(even)').children('.media-container').each(function() {
        $(this).css('padding-left',$(this).data('padding'));
      });
      $(this).children('article.col-md-6:nth-child(even)').children('.caption_2').each(function() {
        $(this).addClass('padleft');
      });
  });
} else {
  $('section.section-modular').find('div.row').each(function() {
      $(this).children('article.col-md-6:nth-child(odd)').children('.media-container').each(function() {
        $(this).css('padding-right','0px');
      });
      $(this).children('article.col-md-6:nth-child(odd)').children('.caption_2').each(function() {
        $(this).removeClass('padright');
      });
      $(this).children('article.col-md-6:nth-child(even)').children('.media-container').each(function() {
        $(this).css('padding-left','0px');
      });
      $(this).children('article.col-md-6:nth-child(even)').children('.caption_2').each(function() {
        $(this).removeClass('padleft');
      });
  });
}

}
