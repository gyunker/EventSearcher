function parseQuery(category, zipCode, dateRange, keyboard){
    console.log("category" + category + "zipcode" + zipCode + "dataRange" + dateRange)

    var query = "&date=" + dateRange

    if(_isEmpty(zipCode)){
        query += "&location=" + "94110";
    }else{
        query +=  "&location=" + zipCode;
    }
    if(_isEmpty(dateRange)){
        query += "&date=Future"
    }
    if(!(_isEmpty(category))){
        query += "&category=" + category;
    }

    if(!(_isEmpty(keyboard))){
        query += "&q=" + keyboard;
    }
    console.log(query);

    return query
}
var eventfulApi = {
    apiKey: 'pWNMRCZCjh9HB4nj',
    url: "http://api.eventful.com/json",
    urlSearch: 'https://api.eventful.com/json/events/search?',
    limit: '10',
    pageNumber: 1,
    pageSize: 6,
    getCategories: function() {
        var listCategories = "http://api.eventful.com/json/categories/list?app_key=xhL49Vr4wmqm32cg"
        $.ajax(  "https://safe-headland-27088.herokuapp.com/" + listCategories, {
            type: 'GET',
            dataType: 'json',
            "async": true,
            "crossDomain": true,
            success: function( response ) {
                console.log( response );

                var categories = response["category"]
                // const categories = results["category"].map(category => _findText(category.name) );

                var $selectList = $("<select>", {
                    class: "custom-select",
                    id: "category"
                })
                var $category = $('<option>', {
                    text: "Choose a Category",
                    value: "",
                    placeholder: "Select a Category"
                })
                $selectList.append($category);
                categories.forEach(function (category) {
                    var $category = $('<option>', {
                        text: _findText(category.name),
                        value: category.id,
                        placeholder: "Select a Category"
                    })
                    $selectList.append($category);
                })
                $("#categories").append($selectList)
            },
            error: function( req, status, err ) {
                console.log( 'something went wrong', status, err );
            }
        });
    },
    search: function(query){
        // var APIKey = "pWNMRCZCjh9HB4nj";
        console.log(query)
        //Eventful API logic
        var queryURL = "https://api.eventful.com/json/events/search?app_key=" + this.apiKey +
            "&page_number=" + this.pageNumber +
            "&page_size=" + this.pageSize +
            query
        console.log(queryURL);
        $.ajax(  "https://safe-headland-27088.herokuapp.com/" + queryURL, {
            type: 'GET',
            dataType: 'json',
            "async": true,
            "crossDomain": true,
            success: function( response ) {
                console.log(response["events"] === null)
                if(response.error == 1) {
                    console.log( response );
                }else{
                    if(response["events"] === null){
                        $('#searchModal').modal('show');
                    }else{
                        if(!!response["events"]) {
                            console.log(response["events"])
                            displayCardDeck(response["events"].event)
                        }
                    }
                }
            },
            error: function( req, status, err ) {
                console.log( 'something went wrong', status, err );
            }
        });
    }

}

function _findText(str) {
    return str.replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g,'"')
}

function displayCardDeck(events){
    var $cardDeck = $('.events-grid')
    $cardDeck.empty();
    events.forEach(function(event){
        var cardObj = new Card(event);
        cardObj.createCard()
    })
}

function displayCategories(){
    var $selectList = $("<select>", {
        class: "custom-select",
        id: "category"
    })
    var $category = $('<option>', {
        text: "Choose a Category",
        value: "",
        placeholder: "Select a Category"
    })
    $selectList.append($category);
    categories["category"].forEach(function (category) {

        var $category = $('<option>', {
            text: _findText(category.name),
            value: category.id,
            placeholder: "Select a Category"
        })
        $selectList.append($category);
    })
    $("#categories").append($selectList)
}

$(document).ready(function() {
    displayCategories()

    // $("#search").on("click", function(e) {
    //     e.preventDefault();
    //     // $(".loading").show()
    //
    //     var location = $('#location').val().trim();
    //     var dateRange = $('#start_date').val().trim();
    //     var keyboard = $('#keywords').val().trim();
    //     var query = parseQuery($('#category').val(), location, dateRange, keyboard)
    //     eventfulApi.search(query);
    //     // $(".loading").hide()
    //     return false;
    // })

    if ("geolocation" in navigator) {
        /* geolocation is available */
    //    set zipcode and map
    } else {
        /* geolocation IS NOT available */
    //    set default bay area code
    }


    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position)
        // do_something(position.coords.latitude, position.coords.longitude);
    });


    var watchID = navigator.geolocation.watchPosition(function(position) {
        console.log(position)
        // console.log(position.coords.latitude + " " + position.coords.longitude);

    });

})


var categories = {"category":[{"name":"Concerts &amp; Tour Dates","event_count":null,"id":"music"},{"name":"Conferences &amp; Tradeshows","event_count":null,"id":"conference"},{"name":"Comedy","event_count":null,"id":"comedy"},{"name":"Education","event_count":null,"id":"learning_education"},{"name":"Kids &amp; Family","event_count":null,"id":"family_fun_kids"},{"name":"Festivals","event_count":null,"id":"festivals_parades"},{"name":"Film","event_count":null,"id":"movies_film"},{"name":"Food &amp; Wine","event_count":null,"id":"food"},{"name":"Fundraising &amp; Charity","event_count":null,"id":"fundraisers"},{"name":"Art Galleries &amp; Exhibits","event_count":null,"id":"art"},{"name":"Health &amp; Wellness","event_count":null,"id":"support"},{"name":"Holiday","event_count":null,"id":"holiday"},{"name":"Literary &amp; Books","event_count":null,"id":"books"},{"name":"Museums &amp; Attractions","event_count":null,"id":"attractions"},{"name":"Neighborhood","event_count":null,"id":"community"},{"name":"Business &amp; Networking","event_count":null,"id":"business"},{"name":"Nightlife &amp; Singles","event_count":null,"id":"singles_social"},{"name":"University &amp; Alumni","event_count":null,"id":"schools_alumni"},{"name":"Organizations &amp; Meetups","event_count":null,"id":"clubs_associations"},{"name":"Outdoors &amp; Recreation","event_count":null,"id":"outdoors_recreation"},{"name":"Performing Arts","event_count":null,"id":"performing_arts"},{"name":"Pets","event_count":null,"id":"animals"},{"name":"Politics &amp; Activism","event_count":null,"id":"politics_activism"},{"name":"Sales &amp; Retail","event_count":null,"id":"sales"},{"name":"Science","event_count":null,"id":"science"},{"name":"Religion &amp; Spirituality","event_count":null,"id":"religion_spirituality"},{"name":"Sports","event_count":null,"id":"sports"},{"name":"Technology","event_count":null,"id":"technology"},{"name":"Other &amp; Miscellaneous","event_count":null,"id":"other"}]}