$(document).ready(function() {
  // --- our code goes here ---

// jQuery function to bind keypress for tweetInput
$( "textarea").keyup(function() {
 var txtcount = $(this).val().length;

 if ($(this).val() === "" && $(this).val() === null){
  console.log(error);
 }

 // this will print # of input - cool
  $(this).siblings("span.counter").text(txtcount);
  //mapping from the DOM
   if( $(this).val().length > 140){
      $(this).siblings("span.counter").css ('color','red');

   } else if($(this).val().length <= 140 && $(this).val().length > 0 ) {
      $(".error").text("");
      $(this).siblings("span.counter").css ('color','blue');
   }else{
      $(this).siblings("span.counter").css ('color','blue');

   }

  });

});





