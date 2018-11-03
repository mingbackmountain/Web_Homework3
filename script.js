// Thanakorn Pasangthien 6088109
const apikey = "AIzaSyDRYqMJBZqgiIR5H6sL8iDPkO_WRH0_iNQ"; //Apikey
$(document).ready(function() {
  let value;
  //get the value of input
  $("#input").keyup(function() {
    value = this.value;
  });
  //search video call event when click the button
  let search_Btn = $("#search");
  search_Btn.on("click", function() {
    //clear video list each time when clicked
    $("#list-video").empty();
    //call a function to show the list video by passing the search key as a parameter
    displayResult(value);
  });

  function result(title, thumbnail, video_url) {
    //render the output of the video consist of title thumbnail and url for the video
    return `
        <div>
        <p>Title:${title}</p>
        <img src="${thumbnail.high.url}">
        <p><a href="http://www.youtube.com/embed/${video_url}">www.youtube.com/embed/${video_url}</a></p>
        </div>
      `;
  }
  //calling the api from this function
  function displayResult(value) {
    //set up the url for api calling
    const URL = `https://content.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${value}&key=${apikey}`;
    $.get(URL, function({ items }) {
      //call get method in order to get the data
      items.map(function(value) {
        //loop through the object that return from api calling
        $("#list-video").append(
          // append the result and pass in the parameter for further rendering
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
