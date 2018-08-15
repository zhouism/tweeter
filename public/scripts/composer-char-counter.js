
$(document).ready(function() {
    $(".new-tweet").on("keyup", "#new-tweet textarea", function() {
      var charactersLeft = 140 - $(this).val().length;
      var updatedCounter = $(this).siblings("span").find(".counter").html(charactersLeft);
      if (charactersLeft < 0) {
        $(".counter").css("color", "red");
      }
    });
  });