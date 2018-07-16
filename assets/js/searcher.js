var eventfulApi = {
    apiKey: 'pWNMRCZCjh9HB4nj',
    url: "http://api.eventful.com/json",
    urlSearch: 'https://api.eventful.com/json/events/search?',
    limit: '10',
    location: "San+Francisco",
    pageNumber: 1,
    pageSize: 6,
    category: "Comedy",
    getCategories: function () {

        var listCategories = "http://api.eventful.com/json/categories/list?app_key=xhL49Vr4wmqm32cg"
        $.ajax({
            url: "https://safe-headland-27088.herokuapp.com/" + listCategories,
            method: "GET",
            "async": true,
            "crossDomain": true
        }).then(function (response) {
            var results = JSON.parse(response);
            var categories = results["category"]
            // const categories = results["category"].map(category => _findText(category.name) );
            console.log(categories)

            var $dropDown = $("<div>", {
                class: "dropdown-menu show",
                "aria-labelledby": "category"
            })
            categories.forEach(function (category) {
                var $category = $('<a>', {
                    class: "dropdown-item catVal",
                    href: "#",
                    text: category.name,
                    id: category.id
                })
                $dropDown.append($category);
            })
            console.log($dropDown);
            $dropDown;
        })
    },

    search: function(query){
        //Eventful API logic
        // var APIKey = "pWNMRCZCjh9HB4nj";
        // var keyword = categoryValue;
        // var pageNumber = 1;
        // var pageSize = 6;
        // var zipcode = zipcodeValue;
        // var date = "Future"
        var queryURL = "https://api.eventful.com/json/events/search?app_key=" + this.apiKey +
            "&c=" + this.category +
            "&page_number=" + this.pageNumber +
            // "&date=" + this.date +
            "&page_size=" + this.pageSize +
            "&location=" + this.location;

        $.ajax({
            url: "https://safe-headland-27088.herokuapp.com/" + queryURL,
            method: "GET",
            "async": true,
            "crossDomain": true
        }).then(function (response) {
            var results = JSON.parse(response);
            console.log(results)
            displayCardDeck(results["events"].event)
        })
    }
}

function _findText(str) {
    return str.replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g,'"')
}

function displayCategories(){
    console.log("here")
    // <div class="dropdown-menu" aria-labelledby="category">
    //     <a class="dropdown-item catVal" href="#">Music</a>
    //     <a class="dropdown-item catVal" href="#">Cooking</a>
    //     <a class="dropdown-item catVal" href="#">Sports</a>
    //     <a class="dropdown-item catVal" href="#">Paintball</a>
    //     <a class="dropdown-item catVal" href="#">Go Kart</a>
    // </div>
    var $dropDown = $('<div>', {
        class: "dropdown-menu",
        "aria-labelledby": "category"
    })
    var $categories = $('#categories')
    // $('#categories').append(eventfulApi.getCategories());

    // categories.forEach(function (category) {
    //     var $category = $('<a>', {
    //         class: "dropdown-item catVal",
    //         href: "#",
    //         text: category
    //     })
    //     $dropDown.append($category);
    // })

    var $category1 = $('<a>', {
        class: "dropdown-item catVal",
        href: "#",
        text: "music",
        id: "music"
    })
    var $category2 = $('<a>', {
        class: "dropdown-item catVal",
        href: "#",
        text: "education",
        id: "music"
    })
    console.log($category1)
    $dropDown.append($category1);
    $dropDown.append($category2);
    console.log($dropDown)
    $categories.append($dropDown)
}


function displayCardDeck(events){
    console.log(events)
    var $cardDeck = $('.events-grid')

    events.forEach(function(event){
        var cardObj = new Card(event);
        // console.log(cardObj.createCard())

        $cardDeck.append(cardObj.createCard())
    })
}

$(document).ready(function() {

    eventfulApi.search()
    eventfulApi.getCategories()

    $("#add-search").on("click", function(e) {
        e.preventDefault();

        eventfulApi.search();

        return false;
    })
})


