
// Scripts for EditMovieModal

requirejs(["text!EditMovieModal.html"], function(html) {

  var objMovieDetailsModal;

  console.log("Loading modal script");
  $( "body" ).append(html);

  $('#EditMovieModal').on('show.bs.modal', function (event) {
    var trigger = $(event.relatedTarget);
    var movieTitle = trigger.data('movietitle');
    var movieId = trigger.data('movieid');
    var jsonGetMovieDetail = `{"jsonrpc": "2.0", "method": "VideoLibrary.GetMovieDetails", "params": { "movieid": ${movieId} ,  "properties": ["title", "genre", "year", "rating", "director", "trailer", "tagline", "originaltitle", "lastplayed", "playcount", "writer", "studio", "mpaa", "country", "imdbnumber", "runtime", "set", "showlink", "top250", "votes", "thumbnail", "file", "sorttitle", "setid", "dateadded", "tag"] }, "id": "MovieDetail"}`;
    $.getJSON(serverKodi + urlJsonRPC + jsonGetMovieDetail, jQuery.noop)
    .error(function() { alert("Error reading JSON"); })
    .success(function(data) {
      $('.modal-title').text('Title: ' + movieTitle);
      objMovieDetailsModal = data.result.moviedetails;
      $.each(objMovieDetailsModal, function(label, value) {
          $('#ModalMovieForm').append("<div class='form-group''><label for='frm" + label + "'>" + label + "</label><input name='frm" + label + "' class='form-control' type='text' value='" + value + "'></div>");
        })
    });
  });

  $('#EditMovieModal').on('hidden.bs.modal', function (event) {
      //Reset form
      $('#ModalMovieForm').html("")
  });

  function saveMovieChanges() {
      //Create object from form
      var objFromForm = {};
      //objFromForm.add("dateadded": "bla bla");
      //Iterate through $("#ModalMovieForm")[0][i] for the legth of the array  Iterate through $("#ModalMovieForm")[0].length
      // For each element create an object using key as $("#ModalMovieForm")[0][i].name and value $("#ModalMovieForm")[0][i].value
      //Compare object created with objMovieDetailsModal and extract only value that have changed
      //Update only value changed
      alert ("Saving movies");
  }

});
