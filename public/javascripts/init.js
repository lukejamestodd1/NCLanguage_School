(function($){
 $(function(){
   console.log('hi');
   $('.button-collapse').sideNav();
   $('.parallax').parallax();

 }); // end of document ready
})(jQuery); // end of jQuery name space

$(function(){
  $('a').each(function() {
		if ($(this).prop('href') == window.location.href) {
	  	$(this).addClass('current-page');
	  }
  });
 });
