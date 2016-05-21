(function($){
  $(function(){
    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready

  $(function(){
    $('.slider').slider();
  });

  //get rid of bottom margin on main row all views
  $('body .lighten-4').addClass('no-btm-margin');
})(jQuery); // end of jQuery name space


$(function(){
  $('.articles-nav a').each(function() {
    if (window.location.href === $(this).prop('href')) {
      $(this).addClass('active');
	  }
  });
});

$(function(){
  var tabs = ['enrol', 'campuses', 'news', 'blog', 'contact'];
  $('.nav-wrapper a').each(function() {
    for(var i = 0; i < tabs.length; i++) {
      if (window.location.pathname.includes(tabs[i])) {
        $('#homepage').removeClass('current-page');
        $('#'+tabs[i]).addClass('current-page');
      }
      else if (window.location.pathname.includes('articles')){
        $('#homepage').removeClass('current-page');
        if ($('#article-type').html() === '0'){
          $('#blog').addClass('current-page');
        }
        else if ($('#article-type').html() === '0,1'){
          $('#news').addClass('current-page');
        }
      }
    };
  });
});


$(window).load(function(){
    //remove boxes for empty images
    $('.img-card').each(function(){
      if (this.currentSrc === ""){
        $(this).addClass("hidden");
      }
    })
    $('.first-image').each(function(){
      if (this.currentSrc === ""){
        $(this).addClass("hidden");
      }
    })
    //remove date if "undefined"
    $('p').each(function(){
      if (this.data === "undefined"){
        $(this).addClass("hidden");
      }
    })
});
