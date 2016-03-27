
// Scripts for EditMovieModal

requirejs(["text!EditMovieModal.html"], function(html) {

  var objMovieDetailsModal;

  $( "body" ).append(html);

  $('#EditMovieModal').on('show.bs.modal', function (event) {
    var trigger = $(event.relatedTarget);
    var movieTitle = trigger.data('movietitle');
    var movieId = trigger.data('movieid');
    var jsonGetMovieDetail = `{"jsonrpc": "2.0", "method": "VideoLibrary.GetMovieDetails", "params": { "movieid": ${movieId} ,  "properties": ["title", "genre", "year", "rating", "director", "trailer", "tagline", "originaltitle", "lastplayed", "playcount", "writer", "studio", "mpaa", "country", "imdbnumber", "runtime", "set", "showlink", "top250", "votes", "thumbnail", "file", "sorttitle", "setid", "dateadded", "tag"] }, "id": "MovieDetail"}`;
    $.getJSON(serverKodi + urlJsonRPC + jsonGetMovieDetail, jQuery.noop)
    .error(function() {
      logger(1, "EditMovideModal: Error fetching movie details"); 
      alert("Error reading JSON");
    })
    .success(function(data) {
      $('.modal-title').text('Title: ' + movieTitle);
      movieDetails.set(data.result.moviedetails);
          $.each(movieDetails.attributes, function(label, value) {
          $('#ModalMovieForm').append("<div class='form-group''><label for='frm" + label + "'>" + label + "</label><input name='frm" + label + "' class='form-control' type='text' data-type='" + (typeof value) +  "' value='" + ((typeof value === "object") ? String(value) : value) + "'></div>");
      })
    });
  });

  $('#EditMovieModal').on('hidden.bs.modal', function (event) {
      //Reset form
      $('#ModalMovieForm').html("")
  });

$("#btnSaveEditMovieModal").on("click", function () {
      //Create object from form
      var objFromForm = {};
      for (var i=0; i < $("#ModalMovieForm")[0].length; i++) {
        if ($("#ModalMovieForm")[0][i].attributes["data-type"].value === "object") {
          if ($("#ModalMovieForm")[0][i].value === "") {
              objFromForm[$("#ModalMovieForm")[0][i].name.substring(3)] = [];
          } else {
              objFromForm[$("#ModalMovieForm")[0][i].name.substring(3)] = $("#ModalMovieForm")[0][i].value.split(",");
          }
      } else if ($("#ModalMovieForm")[0][i].attributes["data-type"].value === "number") {
          objFromForm[$("#ModalMovieForm")[0][i].name.substring(3)] = parseFloat($("#ModalMovieForm")[0][i].value);
      } else {
          objFromForm[$("#ModalMovieForm")[0][i].name.substring(3)] = $("#ModalMovieForm")[0][i].value;
        }
      }
      //Let Backbone model find & save changes.....
      movieDetails.set(objFromForm);
  });

});
