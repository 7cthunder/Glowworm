$(function () {
  $('#signup').submit(function (e) {
    e.preventDefault();
  })
  $('#signupbtn').click(function () {
    let username = $('#inputUsername').val(),
      password = $('#inputPassword').val(),
      email = $('#inputEmail').val(),
      code = $('#inputRegistrationCode').val();
    $.post("/signup", {
        username: username,
        password: password,
        email: email,
        code: code
      },
      function (data, status) {
        if (data.status === true) {
          window.location.href = '/';
        } else {
          if (typeof($('#alert').val()) === "undefined") {
            let alert = '<div id="alert" class="alert alert-danger" role="alert"></div>';
            $('#signup').prepend(alert);
            $('#alert').text(data.data);
          }
        }
      });
  })
})