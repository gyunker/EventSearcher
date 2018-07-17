function searchEventByCategory(){
    var category = $("select#category").attr('value');
    console.log(category);
}

$(document).ready(function () {

    //Values from home page dropdown
    // categoryValue = "";
    // $('select').on('change',searchEventByCategory).change( searchEventByCategory());
    $(document).on("click", "select#category", function(){
        console.log($(this).val())
    })

    var zipcodeValue = "";
    $('#query').on('change', function (event) {
        zipcodeValue = $(this).val().trim();
        console.log("Zipcode = " + zipcodeValue);
        var query = "&location=" + zipcodeValue
        eventfulApi.search(query);
    });

     $('#search').on('click', function (event) {
         var zipcodeValue = $('#location').val().trim();
         var category = $('#category').attr('id')
    
         console.log("Zipcode = " + zipcodeValue);
         var query = "&location=" + zipcodeValue + "&c=" + category
         eventfulApi.search(query);
     });


    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
    var APIKey = '&units=imperial&APPID=8ad513190a2f28456f8d69724674498c';

//Create a function that will generate an HTML string
//And then add that string to the page
    function createHTML(zip, tempValue, humidityValue, minTempValue, maxTempValue) {
        var weatherClass;

        var htmlString = '<div class="setBorder ' + weatherClass + '">' +
            '<div class="weatherCity">' + zip + '</div>' +
            '<div class="weatherData">' + tempValue + '</div>' +
            '<div class="weatherHumidity">' + humidityValue + '</div>' +
            '<div class="weatherMin">' + minTempValue + '</div>' +
            '<div class="weatherMin">' + maxTempValue + '</div>'
        '</div>';
        $('#weatherResults').html(htmlString);

    }

//Create a function that will execute the Weather AJAX call
    var searchWeather = function (zip) {
        console.log(zip)
        var searchURL = queryURL + zip + APIKey;
        $.ajax({
            url: searchURL,
            type: 'GET',
            dataType: 'json',
            error: function (data) {
                console.log("error");
                console.log(data.status);
                $('#myModal').modal('show');
            },
            success: function (data) {
                console.log("success");
                //Check the browser console to see the returned data
                console.log(data);
                //Check to make sure the success response is ok
                if (data.cod === '404') {
                    alert("Error. Please enter a valid zip code");
                    //adding a return will end the success function
                    return;
                }

                $("#query").val('');

                var theZip = data.name || '????';
                var theTemp = Math.round(data.main.temp) || '????';
                var theHumidity = data.main.humidity || '????';
                var minTemp = Math.round(data.main.temp_min) || '???';
                var maxTemp = Math.round(data.main.temp_max) || '???';


                //Call a function that will create an HTML string & add it to the page
                createHTML(
                    "City: " + theZip,
                    "Current Temperature: " + theTemp + "(F)",
                    "Humidity: " + theHumidity + "%",
                    "Min Temperature: " + minTemp + "(F)",
                    "Max Temperature: " + maxTemp + "(F)",
                );
            }
        });
    };

//Code to be executed once the page has fully loaded


    //Use jQuery to assign a (callback) function to occur when the 'search' button is clicked
    $("#search").on('click', function () {
        console.log("Clicked search");
        //Use jQuery to get the value of the 'query' input box
        var newSearchTerm = $("#location").val();
        console.log(newSearchTerm);
        //Execute the Weather API call with the 'newSearchTerm' string as its argument
        searchWeather(newSearchTerm);
        $("#search").blur();
    });

    //What if someone just wants to click "ENTER"???
    //Use jQuery to assign a (callback) function to occur when enter is pressed
    //This will ONLY work when the '#query' input box is active
    $('#query').on('keypress', function (e) {
        //If enter key is pressed
        if (e.which == 13) {
            //Use jQuery's trigger() function to execute a click event on the '#search' element
            $("#search").trigger('click');
        }
    });
});