$(function () {
  $('#signin').submit(function (e) {
    e.preventDefault();
  })
  $('#signinbtn').click(function () {
    let email = $('#inputEmail').val(),
      password = $('#inputPassword').val();
    $.post("/signin", {
        email: email,
        password: password
      },
      function (data, status) {
        if (data.status === true) {
          window.location.href = '/';
        } else {
          if (typeof($('#alert').val()) === "undefined") {
            let alert = '<div id="alert" class="alert alert-danger" role="alert"></div>';
            $('#signin').prepend(alert);
            $('#alert').text(data.data);
          }
        }
      });
  })
})