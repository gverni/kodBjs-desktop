// Backbone integration
var MovieDetails = Backbone.Model.extend({
  initialize: function() {
    this.on("change", function() {
      var objJSONParams = $.extend({"movieid": this.attributes["movieid"]}, this.changed);
      var jsonUpdateMovieDetail = '{"jsonrpc": "2.0", "method": "VideoLibrary.SetMovieDetails", "params": ' + JSON.stringify(objJSONParams) + ',"id": "libMovies"}'
      logger(3, "MovieDetails: Changed attributes. Sending JSON: " + serverKodi + urlJsonRPC + jsonUpdateMovieDetail);
      $.getJSON(serverKodi + urlJsonRPC + jsonUpdateMovieDetail, jQuery.noop)
      .fail(function() {
        logger(1, "EditMovideModal: Error updating movie details");
        alert("EditMovideModal: Error updating movie details");
      })
      .done(function(data) {
        if (JSON.stringify(data).indexOf("error") === -1) {
            logger(3, "EditMovideModal: Updating movie details succeded!");
            alert("Movie Updated!");

        } else {
            logger(1, "EditMovideModal: JSON errror updating movie details");
            alert("EditMovideModal: JSON errror updating movie details");
          }
      });


    });
  },
});
