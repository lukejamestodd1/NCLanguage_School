(function($){
 $(function(){
   $('.button-collapse').sideNav();
   $('.parallax').parallax();

 }); // end of document ready
})(jQuery); // end of jQuery name space

$(function(){
  $('a').each(function() {
  	//if current url includes button link, change status
    if (window.location.href.indexOf($(this).prop('href')) > -1) {
	  	$(this).addClass('current-page');
      $(this).addClass('active');
	  }
  });
 });
