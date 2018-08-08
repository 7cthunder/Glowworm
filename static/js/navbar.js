$(function () {
  // initialize the navbar: logout or login
  if ($.cookie('cid') && $.cookie('cid') !== "null") {
    addLogoutBtn();
    $('#logout').click(function () {
      $.cookie('cid', null);
      window.location.href = '/signin'
    })
  } else {
    addLoginBtn();
  }
})

function addLoginBtn() {
  let login = '<li><a href="/signin">登录</a></li>';
  $('#log-in-out').append(login);
}

function addLogoutBtn() {
  let logout = '<li><a id="logout" class="glyphicon glyphicon-log-out"></a></li>';
  let userInfo = '<li><a id="user-info" class="glyphicon glyphicon-user" data-toggle="modal" data-target="#myModal"></a></li>';
  $('#log-in-out').append(logout, userInfo);
}