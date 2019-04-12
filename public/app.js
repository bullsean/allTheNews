// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append(
          "<div class='col s12 m12'><div class='card blue darken-1'><div class='card-content white-text'><p data-id='" + data[i]._id + "'>" + data[i].title + "</p></div><div class='card-action'><a href='" + data[i].link + "'>Check out the article</a><a class='waves-effect waves-light btn-large'>Save Article</a></div></div></div>");
    }
  });