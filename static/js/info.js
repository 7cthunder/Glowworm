$(function () {
  let ori_username, ori_intro;

  $('body').prepend(modal);

  $('#myModal').on('hidden.bs.modal', function (e) {
    $('#username').val(ori_username);
    $('#intro').val(ori_intro);
  })

  $.get("/getUser", function (data) {
    let user = data.data;
    $('#username').val(user.name);
    $('#intro').text(user.intro);
    $('#info-avatar').attr('src', user.avatar);
    $('#email').val(user.email);
    $('#info-courseware').val(user.filepath);
    ori_username = user.name;
    ori_intro = user.intro;
  })

  $('#uploadForm').submit(function (e) {
    e.preventDefault();
  })

  $('#uploadForm2').submit(function (e) {
    e.preventDefault();
  })

  $('#upload-img').change(function () {
    let objUrl = getObjectURL(this.files[0]);
    if (objUrl) {
      $("#info-avatar").attr("src", objUrl);
      $.ajax({
        url: '/upload/avatar',
        type: 'POST',
        cache: false,
        data: new FormData($("#uploadForm")[0]),
        processData: false,
        contentType: false
      });
    }
  });

  $('#upload-courseware').change(function () {
    let objUrl = getObjectURL(this.files[0]);
    if (objUrl) {
      $('#info-courseware').val('uploading...');
      $.ajax({
        url: '/upload/courseware',
        type: 'POST',
        cache: false,
        data: new FormData($("#uploadForm2")[0]),
        processData: false,
        contentType: false,
        success: function (result) {
          $('#info-courseware').val(result.data)
        }
      });
    }
  })

  $('#savebtn').click(function () {
    let email = $('#email').val(),
      username = $('#username').val(),
      intro = $('#intro').val();
    $.post("/updateUser", {
      email: email,
      username: username,
      intro: intro
    }, function (data, status) {
      window.location.reload();
    })
  })

  $('#downloadbtn').click(function () {
    window.open('/downloads', '_blank')
  })

  //建立一個可存取到該file的url
  function getObjectURL(file) {
    let url = null;
    if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
      // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }
})

/*
 * inject Modal
 */
let modal = `
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" id="myModalLabel">个人信息</h4>
      </div>
      <div class="modal-body">
        <!-- User info injected-->
        <form id="uploadForm" action="Upload" method="post" enctype="multipart/form-data">
          <div class="avatar-area">
            <img id="info-avatar" alt="Avatar" class="img-circle img-thumbnail center-block">
            <input id="upload-img" name="avatar" type="file" style="display:none" accept="image/*">
            <p class="text-center">
              <button class="btn btn-primary" onclick="$('input[id=upload-img]').click();">更换头像</button>
            </p>
          </div>
        </form>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input name="email" type="email" class="form-control" id="email" placeholder="Email" disabled>
        </div>
        <div class="form-group">
          <label for="username">用户名</label>
          <input name="username" type="text" class="form-control" id="username" autocomplete="off" required>
        </div>
        <div class="form-group">
          <label for="intro">个人简介</label>
          <textarea name="intro" id="intro" class="form-control" rows="4"></textarea>
        </div>
        <form id="uploadForm2" action="Upload" method="post" enctype="multipart/form-data">
          <div class="courseware-area">
            <label for="courseware">课件</label>
            <input id="upload-courseware" name="courseware" type="file" style="display:none">
            <div class="input-group">
              <input id="info-courseware" type="text" class="form-control" disabled>
              <span class="input-group-btn">
                <button id="downloadbtn" class="btn btn-default">下载课件</button>
                <button class="btn btn-default" onclick="$('input[id=upload-courseware]').click();">上传课件</button>
              </span>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button id="savebtn" type="button" class="btn btn-primary">保存</button>
      </div>
    </div>
  </div>
</div>
`;