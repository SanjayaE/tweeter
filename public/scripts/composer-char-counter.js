$(document).ready(function() {
  // --- our code goes here ---
// jQuery function to bind keypress for tweetInput
$( "textarea").keyup(function() {
 var txtcount = $(this).val().length; // this will print # of input - cool

  $(this).siblings("span.counter").text(txtcount)
  //console.log($(this).siblings("span.counter").text(txtcount))
   if( $(this).val().length > 140){
   //console.log(txtcount)
      $(this).siblings("span.counter").css ('color','red');

   } else{
     $(this).siblings("span.counter").css ('color','blue');
   }

// console.log(txtcount);
});

});


// $( "textarea" ).change(function() {
//   console.log(this);
//   console.log($(this).val())
// });


