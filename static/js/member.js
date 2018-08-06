$(function () {
  $.get("/getMembers",
    function (data, textStatus) {
      for (let i = 0; i < data.data.length; i++) {
        let avatar = $('<img>', {
          alt: 'Avatar',
          src: data.data[i].avatar,
          class: 'avatar img-circle center-block'
        });
        let line = $('<hr>');
        let name = $('<h3></h3>').text(data.data[i].name);
        let intro = $('<p class="intro"></p>').text(data.data[i].intro);
        let caption = $('<div class="caption"></div>').append(name, intro);
        let thumbnail = $('<div class="thumbnail"></div>').append(avatar, line, caption);
        let wraper = $('<div class="col-md-3"></div>').append(thumbnail);
        $('#member-list').append(wraper);
      }
    }
  );
})