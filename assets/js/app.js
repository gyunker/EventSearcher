/* This is the leaflet library */
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic2hhbGx5ZyIsImEiOiJjampna250YnkwMWI5M3ZzNGJwcmpxOWQ1In0.921JpJzWVBluf1MAzRmtzA'
}).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);



$(document).ready(function(){
	

var queryURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
            var APIKey = '&units=imperial&APPID=8ad513190a2f28456f8d69724674498c';


//Values from home page drop down
//Code needs to be updated to record "On Change" events.. google it.
var categoryValue = $('#category').val(); 
var zipcodeValue = $('#query').val();
// var dateValue = $('#start_date').val();
console.log(categoryValue + zipcodeValue);

//Eventful API logic
var APIKey = "pWNMRCZCjh9HB4nj";
var keyword = categoryValue;
var pageNumber = 1;
var pageSize = 6;
var zipcode = zipcodeValue;
var date = "Future"
var queryURL = "https://api.eventful.com/json/events/search?app_key=" + APIKey + 
	"&keywords=" + keyword +
	"&page_number=" + pageNumber +
	"&date=" + date +
	"&page_size=" + pageSize+
	"&location=" + zipcode;

$.ajax({
	url: "https://safe-headland-27088.herokuapp.com/" + queryURL,
	method: "GET",
	"async" : true,
	"crossDomain" : true
}).then(function(response) {

var results = JSON.parse(response);
	console.log(results);

//END Eventful API logic



//Create a function that will generate an HTML string 
//And then add that string to the page
function createHTML(zip, tempValue, humidityValue, minTempValue, maxTempValue){
	var weatherClass;

	var htmlString =	'<div class="setBorder ' + weatherClass + '">' +
											'<div class="weatherCity">' + zip + '</div>' +
                                            '<div class="weatherData">' + tempValue + '</div>' +
                                            '<div class="weatherHumidity">' + humidityValue + '</div>' +
                                            '<div class="weatherMin">' + minTempValue + '</div>' +
                                            '<div class="weatherMin">' + maxTempValue + '</div>' 
										'</div>';
    $('#weatherResults').html(htmlString);

}

//Create a function that will execute the Weather AJAX call
var searchWeather = function(zip){

	var searchURL = queryURL + zip + APIKey;
	$.ajax({
		url: searchURL,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log("error");
			console.log(data.status);
			alert("Please enter a valid zip code");
		},
		success: function(data){
			console.log("success");
			//Check the browser console to see the returned data
			console.log(data);
			//Check to make sure the success response is ok
			if (data.cod === '404'){
				alert("Error. Please enter a valid zip code");
				//adding a return will end the success function
				return;
			}

			$("#query").val('');

			var theZip = data.name || '????';
            var theTemp = Math.round(data.main.temp) || '????';
            var theHumidity=  data.main.humidity || '????';
            var minTemp= Math.round(data.main.temp_min) || '???';
            var maxTemp= Math.round(data.main.temp_max) || '???';
            
            

			//Call a function that will create an HTML string & add it to the page
			createHTML(
               "City: " + theZip ,
                "Current Temperature: " + theTemp + "(F)", 
                "Humidity: " +theHumidity + "%",
                "Min Temperature: " + minTemp + "(F)",
                "Max Temperature: " + maxTemp + "(F)",
                
            );
		}
	});
};

//Code to be executed once the page has fully loaded


	//Use jQuery to assign a (callback) function to occur when the 'search' button is clicked
	$("#search").on('click', function(){
		console.log("Clicked search");
		//Use jQuery to get the value of the 'query' input box
		var newSearchTerm = $("#query").val();
		console.log(newSearchTerm);
		//Execute the Weather API call with the 'newSearchTerm' string as its argument 
		searchWeather(newSearchTerm);
		$("#search").blur();
	});

	//What if someone just wants to click "ENTER"???
	//Use jQuery to assign a (callback) function to occur when enter is pressed 
	//This will ONLY work when the '#query' input box is active
	$('#query').on('keypress', function(e){
		//If enter key is pressed
		if (e.which == 13){
			//Use jQuery's trigger() function to execute a click event on the '#search' element
			$("#search").trigger('click');
		}
	});
});
});