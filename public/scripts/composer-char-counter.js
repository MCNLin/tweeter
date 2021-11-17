$(document).ready(function() {
  $('#tweet-text').on("input",function() {
    let characterCount = $(this).val().length;
    let maxCharacters = 140;
    let remainingCharacter = maxCharacters - characterCount;
    // console.log(remainingCharacter)
    $(".counter").text(remainingCharacter);

    if (remainingCharacter < 0) {
      $(".counter").css("color","red");
    } else {
      $(".counter").css("color","white");
    }
  });
  
});
