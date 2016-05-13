(function($){
 $(function(){
   $('.button-collapse').sideNav();
   $('.parallax').parallax();

 }); // end of document ready
})(jQuery); // end of jQuery name space



// $(function(){
//   $('a').each(function() {
//   	//if current url includes button link, change status
//     if (window.location.href.indexOf($(this).prop('href')) > -1) {
// 	  	$(this).addClass('current-page');
//       $(this).addClass('active');
// 	  }
//   });
//  });

$(function(){
  var tabs = ['enrol', 'campuses', 'news', 'blog', 'contact'];
  $('.nav-wrapper a').each(function() {
    for(var i = 0; i < tabs.length; i++) {
      if (window.location.pathname.includes(tabs[i])) {
        $('#homepage').removeClass('current-page');
        $('#homepage').removeClass('active');
        $('#'+tabs[i]).addClass('current-page');
        $('#'+tabs[i]).addClass('active');
      };
    };
  });
 });
