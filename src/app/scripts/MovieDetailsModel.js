// Backbone integration
var MovieDetails = Backbone.Model.extend({
  initialize: function() {
    this.on("change", function() {
        logger(3, "MovieDetails: Changed attributes: " + JSON.stringify(this.changedAttributes()));
    });
  },
});
