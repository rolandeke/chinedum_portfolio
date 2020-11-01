$(document).ready(function () {
  //   $(".btn-filter").click(function () {
  //     var val = $(this).attr("data-filter");
  //     console.log(val);
  //     $("#proj-list li").each(function () {
  //       if ($(this).classList.contains(val) > -1) {
  //         $(this).show();
  //       } else {
  //         $(this).hide();
  //       }
  //     });
  //   });
  $("#contact-form").validate({
    messages: {
      name: {
        required: "Please enter your name",
      },
      email: {
        required: "Please enter your email",
      },
      message: {
        required: "Please enter your message",
      },
    },
  });
});
