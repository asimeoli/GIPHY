// GIPHY JS
var topics = ["hippopotamus", "hippos", "baby hippos", "swimming hippos", "hungry hippos", "hungry hungry hippos"]

var nextButtonID = 0;

//Add buttons from list
function initilizeList() {
    for (var i = 0; i < topics.length; i++) {
        insertButton(topics[i]);
    }
}

//Inserts button to list and attaches mouse click event listener
function insertButton(text) {
    var buttonID = getNextButtonID();
    $('.buttonArea').append('<button class="btn-primary" id=' + buttonID + '>' + text + '</button>');
    $('#' + buttonID).on('click', function(e) {

        var searchTerm = e.target.textContent;
        addGifs(searchTerm);



    });

};

function addGifs(searchTerm) {
    // GIPHY Application logic 
    //taken from giphy.html and modified
    //Thanks Drake!
    // Ajax Settings
    var apiKey = "3592cc7e5ae442228ffbf75db817f367";
    var protocol = "https://";
    var domain = "api.giphy.com";
    var path = "/v1/gifs/search";

    //Postman
    //https://api.giphy.com/v1/gifs/search?api_key=3592cc7e5ae442228ffbf75db817f367&q:=hippo&limit=10&rating=g
    //Url
    var url = protocol + domain + path + "?" + "q=" + searchTerm + "&api_key=" + apiKey + "&limit=10";

    // Ajax Call
    $.ajax({
        url: url,
        method: "GET"
    }).done(function(response) {
        var gifs = response.data; // array of gifs
        $(".gifArea").empty();
        for (var i = 0; i < gifs.length; i++) {
            var gifID = "gif" + i.toString();
            var img = gifs[i].images.fixed_height_still.url;
            var gif = gifs[i].images.fixed_height.url;
            var rating = "rating: " + gifs[i].rating;
            // List them on the page
            $(".gifArea").append("<div id='gifDivs'><img id=" + gifID + " src='" + img + "'><p>" + rating + "</p></img></div>");
            //$(".gifArea").css("background-color", "white");
            $('#' + gifID).on("click", { gif: gif, img: img }, function(e) {
                //change from still to gif
                var source = $(this)[0].currentSrc;
                if (source == e.data.gif) {
                    $(this)[0].src = e.data.img;
                } else {
                    $(this)[0].src = e.data.gif;
                }
            });
        }


    });

}


//
function getNextButtonID() {
    var buttonID = "button" + nextButtonID.toString();
    nextButtonID++;
    return buttonID;
}



//on window load
window.onload = function() {
    initilizeList();
    $("#gif-submit").on("click", function(event) {
        event.preventDefault();
        var searchTerm = $('#gif-entry').val();
        if (searchTerm == "") {
            //do nothing
        } else {
            insertButton(searchTerm);
            addGifs(searchTerm);
            $('#gif-entry')[0].value = "";
        }

    });

}