$(document).ready(function () {

    initPage();

    function initPage() {
        // Grab the articles as a json
        $.getJSON("/articles", function (data) {
            // For each one4
            $('#articles').empty()
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].saved)
                if(data[i].saved) {
                    $("#articles").append(
                        [
                            "<div class='col s12 m12'>",
                            "<div class='card blue darken-1' data-id='" + data[i]._id + "'>",
                            "<div class='card-content white-text'>",
                            "<p class='mainTitle'>" + data[i].title + "</p>",
                            "</div>",
                            "<div class='card-action'>",
                            "<a href='" + data[i].link + "'>Check out the article</a><a class='save waves-effect waves-light btn-large'>Save Article</a>",
                            "</div>",
                            "</div>",
                            "</div>"].join(""));

                } else {
                    return false
                }
                // Display the information on the page
            }
        });
    }
})


