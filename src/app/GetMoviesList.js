
function writeMovieList(movieListJSON) {

    var i=1;
    var strHTML="";
    var thumbURI;
    //strHTML = "Total movies:" + movieListJSON.result.limits.total + "<br/>";
    var movieListDetails = movieListJSON.result.movies;
    $.each(movieListDetails, function(idMovie, movieDetails) {
        if (i == 1) {strHTML += '<div class="row">'};
        strHTML += '<div class="col-sm-3 col-md-3">';
        thumbURI = decodeURIComponent(movieDetails.thumbnail.substring(8,movieDetails.thumbnail.length-1));
        if (!(thumbURI.startsWith("http"))) {thumbURI = serverKodi + "vfs/" + thumbURI};
        strHTML += '<img class="poster" data-toggle="modal" data-target="#EditMovieModal" data-movieid="' + movieDetails.movieid + '" data-movietitle="' +  movieDetails.label + '" Title src="' + thumbURI + '" width="126px" height="180px"></div>'
        i++;
        if (i==5) {
          strHTML += '</div>';
          i = 1;
        };
    });

    $("#loading").hide(); 
    document.getElementById('movielist').innerHTML = strHTML;

}

function getMoviesList() {

  // Settings for development
  /*  var serverKodi = "../../test_files/";
      var urlJsonRPC = "";
      var stringJson = "videolibrary.getmovies_resp.json";
  */
      var urlKodi = serverKodi + urlJsonRPC + stringJsonGetMoviesList;

      $("#loading").show();

      $.getJSON(urlKodi, jQuery.noop)
      .error(function() { alert("Error reading JSON"); })
      .success(function(data) {
         writeMovieList(data);
      });

}
