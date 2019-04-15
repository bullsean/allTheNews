$(document).ready(function () {
    //start the load and render articles
    initPage();
    //trigger a modal popup
    $('.modal').modal();

    $(document).on("click", ".delete", articleDelete);
    $(document).on("click", ".addNote", articleNotes);
    $(document).on("click", ".saveNote", saveNote);
    $(document).on("click", ".deleteNote", deleteNote);

    function initPage() {
        // Grab the articles as a json
        $.getJSON("/articles", function (data) {
            // For each one4
            $('#articles').empty()
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].saved)
                if (data[i].saved) {
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

    function articleNotes() {
        // Empty the notes from the note section
        $("#notes").empty();
        
        var articleToSave = $(this)
            .parents(".card")
            .data();

        // Now make an ajax call for the Article
        $.ajax({
            method: "GET",
            url: "/articles/saved/" + articleToSave.id
        })
            // With that done, add the note information to the page
            .then(function (data) {
                // var articleId = data._id
                console.log(data);
                $("#articleId").text(data.title);
                $(".modal-footer").html("<a class='waves-effect waves-light btn-small modal-close saveNote' data-id='" + data._id + "'>Save Note</a>");
                // If there's a note in the article
                console.log(data.note)
                
                if (data.note) {
                    for (var i = 0; i < data.note.length; i++) {
                        // Constructs an li element to contain our noteText and a delete button
                        currentNote = $("<li>")
                          .text(data.note[i].body)
                          .append($("<a href='#!' class='waves-effect waves-green btn-small deleteNote' data-id='" + data.note[i]._id + "'>Delete</a>"));
                        
                        // Place the body of the note in the body textarea
                        $("#notes").append(currentNote);
                      }
                    
                }
            });
    }

    // When you click the savenote button
    function saveNote() {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        console.log(thisId)

        var noteData = {};
        var newNote = $("#notebodyinput")
          .val()
          .trim();
          console.log(newNote)
        // If we actually have data typed into the note input field, format it
        // and post it to the "/api/notes" route and send the formatted noteData as well
        if (newNote) {
          noteData.body = newNote
          $.ajax({
            method: "POST",
            url: "/notes/" + thisId,
            data: noteData
        }).then(function(result) {
            
            console.log(result)
          });
        }

        $("#notebodyinput").val("");
        
    };

    function deleteNote() {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        console.log(thisId)

        $.ajax({
            url: "/notes/" + thisId,
            method: "DELETE"
          }).then(function() {
            articleNotes()
          });
    };

    //End of document.ready()
});


