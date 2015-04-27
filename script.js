var apikey = 'b5749836178866bb15f4b41b15ac30c692573f21'; // Put your API key here
var i = 0;
var results = [];

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    var displayArray = [];
    displayArray = results;
    console.log(results);

    // JUST NAME AND IMAGE:
    for (i = 0; i < 12; i++) {
        // Display image, which is an object not an array.
        imgURL = results[i].image.small_url;

        $('.results').append("<div class='col-md-4'><img src='" + imgURL + "'><br>" + "Name: " + results[i].name + "</div>");
    }

}
    //// FULL INFO:
    //
    //// Check if description is null, if null, use deck, store to descriptionString
    //var descriptionString = "";
    //if(displayArray[0].description==null){
    //    descriptionString = displayArray[0].deck;
    //    console.log(descriptionString);
    //} else {
    //    descriptionString = displayArray[0].description;
    //}
    //
    //// Check if platform is array, and if it has multiple items store to platformString
    //var platformString = "<br>";
    //for(i = 0; i < displayArray[0].platforms.length; i++){
    //    platformString += displayArray[0].platforms[i].name ", ";
    //}
    //
    //// Display image, which is an object not an array.
    //imgURL = results[0].image.small_url;
    //
    //$('.results').html("<img src='"+imgURL+ "'><br>" + "Name: " + results[0].name + "<br>Release Date: " + results[0].original_release_date + "<br>Platform(s): " + platformString + "<br>Description: " + descriptionString);





$(document).ready(function() {

	// Start the search here!
	search('batman');
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
