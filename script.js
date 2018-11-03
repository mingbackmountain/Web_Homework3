const apikey = "AIzaSyDRYqMJBZqgiIR5H6sL8iDPkO_WRH0_iNQ";
$(document).ready(function() {
  let value;
  $("#input").keyup(function() {
    value = this.value;
  });
  let search_Btn = $("#search");
  search_Btn.on("click", function() {
    $("#list-video").empty();
    displayResult(value);
  });

  function result(title, thumbnail, video_url) {
    return `
        <div>
        <p>Title:${title}</p>
        <img src="${thumbnail.high.url}">
        <p><a href="http://www.youtube.com/embed/${video_url}">www.youtube.com/embed/${video_url}</a></p>
        </div>
      `;
  }
  function displayResult(value) {
    const URL = `https://content.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${value}&key=${apikey}`;
    $.get(URL, function({ items }) {
      items.map(function(value) {
        $("#list-video").append(
          result(
            value.snippet.title,
            value.snippet.thumbnails,
            value.id.videoId
          )
        );
      });
    });
  }
});
