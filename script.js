var apikey = 'b5749836178866bb15f4b41b15ac30c692573f21'; // Put your API key here

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    var displayArray = results;
    console.log(results[0]);

    // Check if description is null, if null, use deck, store to descriptionString

    // Check if platform is array, and if it has multiple items store to platformString

    // Display image, which is an object not an array.
    imgURL = results[0].image.small_url;

    $('.results').html("<img src='"+imgURL+ "'><br>" + "Name: " + results[0].name + "<br>Release Date: " + results[0].original_release_date + "<br>Platform(s): ");
        //platformString + "<br>Description: " + descriptionString);

}

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
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
