
// Scripts for EditMovieModal

requirejs(["text!EditMovieModal.html"], function(html) {

  var objMovieDetailsModal;

  $( "body" ).append(html);

  $('#EditMovieModal').on('show.bs.modal', function (event) {
    var trigger = $(event.relatedTarget);
    var movieTitle = trigger.data('movietitle');
    var movieId = trigger.data('movieid');
    var jsonGetMovieDetail = '{"jsonrpc": "2.0", "method": "VideoLibrary.GetMovieDetails", "params": { "movieid": ' + movieId + '  ,  "properties": ["title", "genre", "year", "rating", "director", "trailer", "tagline", "originaltitle", "lastplayed", "playcount", "writer", "studio", "mpaa", "country", "imdbnumber", "runtime", "set", "showlink", "top250", "votes", "thumbnail", "file", "sorttitle", "dateadded", "tag"] }, "id": "MovieDetail"}';
    logger(3, "EditMovideModal: requesting movie details: " + jsonGetMovieDetail);
    $.getJSON(serverKodi + urlJsonRPC + jsonGetMovieDetail, jQuery.noop)
    .fail(function() {
      logger(1, "EditMovideModal: Error fetching movie details");
      alert("Error reading JSON");
    })
    .done(function(data) {
      $('.modal-title').text('Title: ' + movieTitle);
      movieDetails.set(data.result.moviedetails, {silent: true});
          $.each(movieDetails.attributes, function(label, value) {
              var strHTML;
              switch (label) {
                case "movieid":
                case "thumbnail":
                  //Here the items we don;t want to show
                  break;
                case "file":
                case "lastplayed":
                case "trailer":
                case "set":
                  //Here the item we want to protect
                  strHTML = '<label for="frm' + label + '">' + label + '</label><div class="form-group"><input name="frm' + label + '" class="form-control" type="text" data-type="' + (typeof value) +  '" value="' + ((typeof value === "object") ? String(value) : value) + '"  disabled/>';
                  break;
                case "rating":
                  //Rewriting the whole group as input-group instead of form-group to have the refresh icon attached to the input box (Using form-group the refresh icon appear underneath)
                  strHTML = '<label for="frm' + label + '">' + label + '</label><div class="input-group"><input name="frm' + label + '" class="form-control" type="text" data-type="' + (typeof value) +  '" value="' + ((typeof value === "object") ? String(value) : value) + '"  disabled/><span class="input-group-addon" onclick="refreshRating(\'' + movieDetails.attributes["imdbnumber"] + '\');"><i class="glyphicon glyphicon-refresh"></i></span></div>';
                  break;
                default:
                  strHTML = '<label for="frm' + label + '">' + label + '</label><div class="form-group"><input name="frm' + label + '" class="form-control" type="text" data-type="' + (typeof value) +  '" value="' + ((typeof value === "object") ? String(value) : value) + '"></div>';
              }
              $('#ModalMovieForm').append(strHTML);
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
      //Close the modal
      $('#EditMovieModal').modal('hide');

  });

});

function refreshRating(imdbid) {

  alert("IMDB ID:" +  imdbid);

}
