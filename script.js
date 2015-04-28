var apikey = 'b5749836178866bb15f4b41b15ac30c692573f21'; // Put your API key here
var i = 0;
var results = [];
var displayArray = [];
var copiedArray = [];

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {

    for (i = 0; i < results.length; i++) {
        // Check if description is null, if null, use deck, store to descriptionString
        var descriptionString = "";
        if (results[i].description == null || "  " || " ") {
            descriptionString = results[i].deck;
            if (results[i].deck == null){
                descriptionString = "No Description Available";
            }
        } else {
            descriptionString = results[i].description;
        }
        // Truncate and clean descriptionString
        descriptionString = descriptionString.replace(/<(?:.|\n)*?>/gm, '');
        descriptionString = descriptionString.slice(0,150);

        // Check if platform is array, and if it has multiple items store to platformString
        var platformString = "";
        if(!results[i].platforms.length){
            platformString += "N/A";
        } else {
            for (j = 0; j < results[i].platforms.length - 1; j++) {
                platformString += results[i].platforms[j].name + ", ";
            }
            platformString += results[i].platforms[j].name;

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
    return results;
}

$(document).ready(function() {

	// Start the search here!
	//search('batman');

    $('.searchButton').on('click', function(){
        $('.results').empty();
        search($('.searchInput').val());
    });

    $('.searchInput').keyup(function(key){
        if(key.keyCode ==13){
            $('.results').empty();
            search($('searchInput').val());
        }
    });

    $('.filterButton').on('click', function(){
        copiedArray = displayArray.slice();
        copiedArray = $.grep(copiedArray, function (obj) {
            return obj.name.indexOf($('.filterInput').val()) >= 0;
        });
        $('.results').empty();
        searchCallback(copiedArray);
    });

    $('.filterInput').keyup(function(key){
        if(key.keyCode ==13) {
            copiedArray = displayArray.slice();
            console.log(displayArray);
            copiedArray = $.grep(copiedArray, function (obj) {
                return obj.name.indexOf($('.filterInput').val()) >= 0;
            });
            $('.results').empty();
            searchCallback(copiedArray);
        }
        });

    $('.sortButton').on('click', function(){
        var sortArray;
        if(copiedArray.length == 0 ) {
            sortArray = displayArray;
        } else{
          sortArray = copiedArray;
        }
        sortArray.sort(function(a,b){
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });
        $('.results').empty();
        searchCallback(sortArray);
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
            displayArray = [];
            displayArray = data.results;
	        searchCallback(data.results);
	    }
	});

}
