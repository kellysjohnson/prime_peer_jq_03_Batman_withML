var apikey = 'b5749836178866bb15f4b41b15ac30c692573f21'; // Put your API key here
var i = 0;
var results = [];
var displayArray = [];

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    displayArray = [];
    displayArray = results;
    console.log(results);

    for (i = 0; i < displayArray.length; i++) {
        // Check if description is null, if null, use deck, store to descriptionString
        var descriptionString = "";
        if (displayArray[i].description == null || "  " || " ") {
            descriptionString = displayArray[i].deck;
            if (displayArray[i].deck == null){
                descriptionString = "No Description Available";
            }
        } else {
            descriptionString = displayArray[i].description;
        }
        // Truncate and clean descriptionString
        descriptionString = descriptionString.replace(/<(?:.|\n)*?>/gm, '');
        descriptionString = descriptionString.slice(0,150);

        // Check if platform is array, and if it has multiple items store to platformString
        var platformString = "<br>";
        if(!displayArray[i].platforms.length){
            platformString += "N/A";
        } else {
            for (j = 0; j < displayArray[i].platforms.length; j++) {
                platformString += displayArray[i].platforms[j].name + ", ";
            }
        }
        // Display image, which is an object not an array.
        if(!results[i].image){
            imgURL = "<img src='sad_face.jpg'>";
        } else {
            imgURL = "<img src='" + results[i].image.small_url + "'>";
        }

        $('.results').append("<div class='col-md-6 images'>" + imgURL + "<br>" + "Name: " + results[i].name + "<p class='hidden'>Release Date: " + results[i].original_release_date + "<br>Platform(s): " + platformString + "<br>Description: " + descriptionString + "</p></div>");
    }

    $('.images').on('click', function () {
        $(this).toggleClass('big');
        $(this).children('p').toggleClass('hidden');
    });
    return displayArray;
}

$(document).ready(function() {

	// Start the search here!
	//search('batman');

    $('.searchButton').on('click', function(){
        $('.results').empty();
        displayArray = search($('.searchInput').val());
    });

    $('.filterButton').on('click', function(){
        var found_names = $.grep(displayArray, function(obj) {
            return obj.name.indexOf($('.filterInput').val()) >= 0;
        });
        console.log($('.filterInput').val());
        $('.results').empty();
        console.log(found_names);
        searchCallback(found_names);
    });
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
