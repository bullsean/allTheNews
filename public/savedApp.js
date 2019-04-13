$(document).ready(function () {
    //start the load and render articles
    initPage();
    //trigger a modal popup
    $('.modal').modal();

    $(document).on("click", ".delete", articleDelete);
    
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
                            "<a href='" + data[i].link + "'>Check out the article</a><a href='#noteModal' class='addNote modal-trigger waves-effect waves-light btn-large'>Add a Note</a><a class='delete waves-effect waves-light btn-large'>Delete From Saved</a>",
                            "</div>",
                            "</div>",
                            "</div>"].join(""));

                } else {
                    return false
                }
                // Display the information on the page
            }
        });
    };

    //delete function when delete button is pressed the article should be removed and data updated so that the value is no longer saved === true and the page re-rendered.

    function articleDelete() {
        // This function is triggered when the user wants to delete an article
        // When we rendered the article initially, we attached a javascript object containing the headline id
        // to the element using the .data method. Here we retrieve that.
        var articleToDelete = $(this)
            .parents(".card")
            .data();

        console.log(articleToDelete)

        // Remove card from page
        $(this)
            .parents(".card")
            .remove();

        articleToDelete.saved = false;

        $.ajax({
            method: "PUT",
            url: "/articles/saved/" + articleToDelete.id,
            data: articleToDelete
        }).then(function (data) {
            // If the data was saved successfully
            if (data.saved === false) {
                // Run the initPage function again. This will reload the entire list of articles
                initPage();
            }
        });
    }
})


