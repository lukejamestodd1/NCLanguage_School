(function($){
 $(function(){
   console.log('hi');
   $('.button-collapse').sideNav();
   $('.parallax').parallax();

 }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function(){
	tinymce.remove();
	tinyMCE.init({
	selector: "textarea"
	});
});
