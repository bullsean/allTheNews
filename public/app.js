$(document).ready(function () {

    initPage();

    $(document).on("click", ".save", articleSave);

    function initPage() {
        // Grab the articles as a json
        $.getJSON("/articles", function (data) {
            // For each one
            for (var i = 0; i < data.length; i++) {
                // Display the information on the page
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
            }
        });
    }



    function articleSave() {
        // This function is triggered when the user wants to save an article
        // When we rendered the article initially, we attached a javascript object containing the headline id
        // to the element using the .data method. Here we retrieve that.
        var articleToSave = $(this)
            .parents(".card")
            .data();

        console.log(articleToSave)

        // Remove card from page
        $(this)
            .parents(".card")
            .remove();

        articleToSave.saved = true;
        // Using a patch method to be semantic since this is an update to an existing record in our collection
        $.ajax({
            method: "PUT",
            url: "/articles/saved/" + articleToSave._id,
            data: articleToSave
        }).then(function (data) {
            // If the data was saved successfully
            if (data.saved) {
                // Run the initPage function again. This will reload the entire list of articles
                initPage();
            }
        });
    }
})


