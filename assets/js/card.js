function _findText(str) {
    // console.log(str)
    return str.replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g,'"')
}

// funtion _formatTime(time) {
//     return moment(parseInt(time)).format("MMM YYYY HH:mm:ss");
// }


function _truncate(str,from, to) {
    return str.substr(from, to)
    str.indexOf(".")
}

function _isEmpty(val){
    return !val;
}

function _formatCardDescription(str) {
    if(str === null){ return ""}
    var len = str.length;
    if(len > 0){
        var description = _findText(str);

        if(len > 400){
            description = _truncate(description, 0, 400);
            // find the first period '.' f
            index = description.indexOf(".", 200)
            return description.replace(_truncate(description, index, description.length), " ...")
        }
    }else{
        return ""
    }
}

class Card {
    constructor(event, category = "music") {
        this.image = event.image
        this.title = event.title
        this.description = event.description
        this.venue_name = event.venue_name
        this.start_time = event.start_time
        this.venue_address = event.venue_address
        this.city = event.city_name
        this.region_abbr = event.region_abbr
    }
    header(){
        // <header class="card-header">
        //     <div class="card-meta">
        //         <a href="#"><time class="timeago" datetime="2017-10-03 20:00" data-tid="5">9 months ago</time></a> in <a href="page-category.html">Lifestyle</a>
        //     </div>
        //     <a href="post-image.html">
        //         <h4 class="card-title">Oh, I guess they have the blues</h4>
        //     </a>
        // </header>
        var $header = $('<header>').addClass('card-header bg-secondary')
        var $timeVenue = $('<div>').addClass('card-meta')
        var date =  $('<time>',{
            text: moment(this.start_time).format('MMMM Do, h:mm a')})
        $timeVenue.append(date)
        $header.append($timeVenue)
        $header.append($("<h4>").text(this.title))
        return $header

    }
    img(){
        // <img class="card-img-top" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src=" " >
        // console.log(this.image)
        if(_isEmpty(this.image)){
            console.log('yes')
            return ""

        }
        if(this.image === null){
            return false;
        }
        var mediumImage = this.image["medium"]
        var img = $("<img>", {
            class: "card-img-top",
            src: 'https://' +  mediumImage.url,
            alt: this.title,
            "data-width": mediumImage.width,
            "data-height": mediumImage.height,
            style: "width: 100%; height: 100%; display: block;"
        })
        return img
    }
    cardBody(){
        var cardBody = $("<div>").addClass("card-body bg-light")
        // var title = $("<h4>").text(this.title)
        var description = $("<p>", {
            class: "card-text text-secondary",
            text: _formatCardDescription(this.description )
        })
        // cardBody.append(title)
        cardBody.append(description)
        return cardBody
    }

    footer() {
        // <div class="card-footer">
        //     <small class="text-muted">Last updated 3 mins ago</small>
        // </div>
        var venue = this.venue_name + ", " + this.city + ", " + this.region_abbr
        var $cardFooter = $('<div>').addClass('card-footer')
        var $small = $('<small>').addClass("text-mutted").text(venue)
        var $tags = $('<div>').addClass("tags text-mutted").text("#music")
        $cardFooter.append($small)
        $cardFooter.append($tags)
        return $cardFooter
    }

    createCard() {
        var $cardDeck = $('.events-grid')
        var $col = $('<div>').addClass("col-md-4")
        var $card = $("<article>").addClass('card mb-4 box-shadow');
        $card.append(this.header())
        $card.append(this.img())
        $card.append(this.cardBody())
        $card.append(this.footer())
        $col.append($card)
        $cardDeck.append($col)

    }
}

var event1 = {
    "watching_count": null,
    "olson_path": "America/Los_Angeles",
    "calendar_count": null,
    "comment_count": null,
    "region_abbr": "CA",
    "postal_code": null,
    "going_count": null,
    "all_day": "0",
    "latitude": "37.7699799",
    "groups": null,
    "url": "http://sanfrancisco.eventful.com/events/crypto-happy-hour-comedy-night-/E0-001-114240306-2?utm_source=apis&utm_medium=apim&utm_campaign=apic",
    "id": "E0-001-114240306-2",
    "privacy": "1",
    "city_name": "San Francisco",
    "link_count": null,
    "longitude": "-122.4481376",
    "country_name": "United States",
    "country_abbr": "USA",
    "region_name": "California",
    "start_time": "2018-07-13 19:00:00",
    "tz_id": null,
    "description": " Welcome to SF&#39;s first Crypto Happy Hour and Comedy night. Whether you&#39;re a Crypto pro, or just want dinner and comedy - we encourage you to come and mix, mingle and laugh with us at this fun event! Seating is limited, we strongly urge that you register in advance. TIMELINES Comedy Showcase 7 pm until 8:30 PM Crypto Mix & Mingle 8:30 until 10:00 PM COMEDY COUCH SF Comedy Couch SF is a volunteer run organization that was founded by former recreation therapist, NY Transplant Rose Hienz; and former Tech/finance professional and SF Native and Kipster Fuller in May 2017. Today, Rose and Kip are widely known for producing SF&#39;s funniest, hippest and most diverse participatory Comedy Incubators and stand up comedy shows.  SF BLOCKCHAIN COLLECTIVE Co-host Gee Sivalingam is the founder of SF Blockchain collective, which is primarily focused on Crytpo/Blockchain education. Gee is a fun guy and once tried stand up comedy in a past life. CHECK IN INSTRUCTIONS: Comedy showcase starts at 7 PM but check-in time for the Comedy show begins at 6:45 pm. The Comedy room located towards the rear of the restaurant. To claim your seat enter the comedy room and walk to the front of the performance area and a host will ask your name and route you to a seat. FREQUENTLY ASKED QUESTIONS: WHAT IF I ARRIVE AND SEATING IS NOT AVAILABLE? We advise that you book your seat in advance, seating may limited but we try and accomodate everyone who comes to the show! CAN I MAKE A DONATION USING CRYPTO or CASH? Yes - we will accept Crypto and cash donations at each event! IS THERE FOOD AND A FULL BAR? Yes IS THERE A DRINK MINIMUM? No drink minimum IS THERE PARKING AVAILABLE There are many parking spaces nearby. FURTHER QUESTIONS: Email is at: info@comedycouchsf.com ",
    "modified": "2018-06-11 17:26:27",
    "venue_display": "1",
    "tz_country": null,
    "performers": null,
    "title": "Crypto Happy Hour & Comedy Night",
    "venue_address": "1568 Haight Street",
    "geocode_type": "EVDB Geocoder",
    "tz_olson_path": null,
    "recur_string": null,
    "calendars": null,
    "owner": "evdb",
    "going": null,
    "country_abbr2": "US",
    "image": {
        "small": {
            "width": "48",
            "url": "//d1marr3m5x4iac.cloudfront.net/images/small/I0-001/040/173/962-9.jpeg_/crypto-happy-hour-comedy-night-62.jpeg",
            "height": "48"
        },
        "width": "48",
        "caption": null,
        "medium": {
            "width": "128",
            "url": "//d1marr3m5x4iac.cloudfront.net/images/medium/I0-001/040/173/962-9.jpeg_/crypto-happy-hour-comedy-night-62.jpeg",
            "height": "128"
        },
        "url": "//d1marr3m5x4iac.cloudfront.net/images/block250/I0-001/040/173/962-9.jpeg_/crypto-happy-hour-comedy-night-62.jpeg",
        "thumb": {
            "width": "48",
            "url": "//d1marr3m5x4iac.cloudfront.net/images/thumb/I0-001/040/173/962-9.jpeg_/crypto-happy-hour-comedy-night-62.jpeg",
            "height": "48"
        },
        "height": "48"
    },
    "created": "2018-05-08 14:48:08",
    "venue_id": "V0-001-012744020-1",
    "tz_city": null,
    "stop_time": null,
    "venue_name": "Michael Collins Irish Bar",
    "venue_url": "http://sanfrancisco.eventful.com/venues/michael-collins-irish-bar-/V0-001-012744020-1?utm_source=apis&utm_medium=apim&utm_campaign=apic"
}
var event2 = {
    "watching_count": null,
    "olson_path": "America/Los_Angeles",
    "calendar_count": null,
    "comment_count": null,
    "region_abbr": "CA",
    "postal_code": "94704",
    "going_count": null,
    "all_day": "0",
    "latitude": "37.8663488",
    "groups": null,
    "url": "http://sanfrancisco.eventful.com/events/ballyhoo-/E0-001-114089906-1?utm_source=apis&utm_medium=apim&utm_campaign=apic",
    "id": "E0-001-114089906-1",
    "privacy": "1",
    "city_name": "Berkeley",
    "link_count": null,
    "longitude": "-122.2671952",
    "country_name": "United States",
    "country_abbr": "USA",
    "region_name": "California",
    "start_time": "2018-07-14 19:30:00",
    "tz_id": null,
    "description": null,
    "modified": "2018-06-07 05:11:39",
    "venue_display": "1",
    "tz_country": null,
    "performers": {
        "performer": {
            "creator": "ballyhoo",
            "linker": "evdb",
            "name": "Ballyhoo!",
            "url": "http://concerts.eventful.com/Ballyhoo?utm_source=apis&utm_medium=apim&utm_campaign=apic",
            "id": "P0-001-000045820-6",
            "short_bio": "Sick Party Rock from Maryland..."
        }
    },
    "title": "Ballyhoo!",
    "venue_address": "2367 Shattuck Ave",
    "geocode_type": "EVDB Geocoder",
    "tz_olson_path": null,
    "recur_string": null,
    "calendars": null,
    "owner": "evdb",
    "going": null,
    "country_abbr2": "US",
    "image": {
        "small": {
            "width": "48",
            "url": "//d1marr3m5x4iac.cloudfront.net/images/small/I0-001/004/073/856-0.jpeg_/ballyhoo-56.jpeg",
            "height": "48"
        },
        "width": "48",
        "caption": null,
        "medium": {
            "width": "128",
            "url": "//d1marr3m5x4iac.cloudfront.net/images/medium/I0-001/004/073/856-0.jpeg_/ballyhoo-56.jpeg",
            "height": "128"
        },
        "url": "//d1marr3m5x4iac.cloudfront.net/images/small/I0-001/004/073/856-0.jpeg_/ballyhoo-56.jpeg",
        "thumb": {
            "width": "48",
            "url": "//d1marr3m5x4iac.cloudfront.net/images/thumb/I0-001/004/073/856-0.jpeg_/ballyhoo-56.jpeg",
            "height": "48"
        },
        "height": "48"
    },
    "created": "2018-05-03 01:13:20",
    "venue_id": "V0-001-011214760-1",
    "tz_city": null,
    "stop_time": null,
    "venue_name": "Cornerstone Berkeley",
    "venue_url": "http://sanfrancisco.eventful.com/venues/cornerstone-berkeley-/V0-001-011214760-1?utm_source=apis&utm_medium=apim&utm_campaign=apic"
}
var event3 = {
    "watching_count": null,
    "olson_path": "America/Los_Angeles",
    "calendar_count": null,
    "comment_count": null,
    "region_abbr": "CA",
    "postal_code": null,
    "going_count": null,
    "all_day": "0",
    "latitude": "37.787467",
    "groups": null,
    "url": "http://sanfrancisco.eventful.com/events/blockchain-event-/E0-001-115827510-5?utm_source=apis&utm_medium=apim&utm_campaign=apic",
    "id": "E0-001-115827510-5",
    "privacy": "1",
    "city_name": "San Francisco",
    "link_count": null,
    "longitude": "-122.4076398",
    "country_name": "United States",
    "country_abbr": "USA",
    "region_name": "California",
    "start_time": "2018-10-05 09:00:00",
    "tz_id": null,
    "description": " is hosted by the SF Blockchain Community for the Community! Week-long FREE Events and Exhibitions! is designed to educate enthusiast consumers, developers, and entrepreneurs on building and utilizing the next generation of blockchain technology products. The greater goal of this intensive event is to bolster the industry’s reach to mainstream adoption of the blockchain projects that matter. The week of events is structured as follows: Headline Events San Francisco Blockchain Week is centered around the organization of three headline events - (1) Ethereum Hackathon ETHSF on October 5-7, 2018  (2) Crypto Economic Security Conference (CESC) on October 11-12, 2018 (3) Blockchain Academy hosted by UC Berkeley (coming soon) Confirmed attendees:   Joseph Poon - Co-Author Plasma and Lightning Network Alessandro Chiesa - Founder of Zcash, Assistant Professor at UC Berkeley Karl Floersch - Casper Development, Ethereum Foundation Joseph Bonneau - Postdoctoral Researcher, Stanford Silvio Micali - Turing Award Winner, Professor, MIT Emin Gun Sirer - Associate Professor, Cornell University (IC3) Loi Luu - Co-Founder, Kyber Network Dominic Williams - President and Chief Scientist, Dfinity Dan Robinson - Product Architect, Chain Howard Wu - Libsnark co-aurthor, Managing partner at Dekrypt Capital  Yonatan Sompolinsky - Co-Founder and Scientist, DAGlabs, Co-author Ghost Protocol Yoichi Hirai - Formal Verification Engineer, Ethereum Foundation Ari Juels - Professor, Jacobs Institute, Cornell Tech Zaki Manian - Executive Director of Trusted IoT Alliance Dawn Song - EECS Professor, UC Berkeley Christian Catchin - Researcher, IBM Zurich Sunny Aggarwal - Researcher and Core Dev, Cosmos Education & Development Workshop Free daily events, technical meetups, deep dives, and a blockchain academy - hosted by UC Berkeley - will be bundled together to form an unforgettable educational track. Agenda is coming soon! Networking & Leisure Attendees will have a networking app that (1) provides event notifications, (2) can schedule meetings, (3) enters users into prize giveaways based on their attendance at various events, and (4) builds their customized leisure-events track in advance. Events include Crypto Happy Hours, Block Parties, San Francisco Blockchain Tours, and more that will be hosted by local startup teams and vendors. Community Building & Recruiting Given significant expected attendance by talent and innovators, San Francisco Blockchain Week will host a job fair alongside recruitment workshops and community building activities for various projects. Your FREE Ticket provides you with access to: 1. More than 50 free workshops, deep dives, and parties throughout the week. 2. Access to the Networking App in order to stay up-to-date. 3. Free Crypto Giveaways plus many more perks! Don&#39;t forget to join our app after sign up (coming soon)! ** This is not an admission ticket for ETHSF or CESC. Please refer to their sites for more information.  Are you organizing a satellite event? Awesome! Share it with us here and we will share with the rest of the community! utilizes multiple technologies to pair leading Founders, Researchers, Creators, dApps, and Platforms with aspiring blockchain developers, entrepreneurs, and consumers. This week will teach everything from basic knowledge on how to handle private keys and interact with wallets to how to build consumer facing applications are meaningful contributions to the global blockchain movement. The week is designed for blockchain amateurs and experienced-founders alike. is well-positioned to be the hub for meaningful discussion and tangible developments in the ever-changing and rapidly growing blockchain industry. For more information, visit us at SFBlockchainWeek.io Made Possible By: ",
    "modified": "2018-07-10 05:38:13",
    "venue_display": "1",
    "tz_country": null,
    "performers": null,
    "title": "Blockchain Event",
    "venue_address": "Geary Street &amp Powell Street",
    "geocode_type": "EVDB Geocoder",
    "tz_olson_path": null,
    "recur_string": null,
    "calendars": null,
    "owner": "evdb",
    "going": null,
    "country_abbr2": "US",
    "image": {
        "small": {
            "width": "48",
            "url": "//d1marr3m5x4iac.cloudfront.net/images/small/I0-001/040/607/000-8.jpeg_/blockchain-event-00.jpeg",
            "height": "48"
        },
        "width": "48",
        "caption": null,
        "medium": {
            "width": "128",
            "url": "//d1marr3m5x4iac.cloudfront.net/images/medium/I0-001/040/607/000-8.jpeg_/blockchain-event-00.jpeg",
            "height": "128"
        },
        "url": "//d1marr3m5x4iac.cloudfront.net/images/small/I0-001/040/607/000-8.jpeg_/blockchain-event-00.jpeg",
        "thumb": {
            "width": "48",
            "url": "//d1marr3m5x4iac.cloudfront.net/images/thumb/I0-001/040/607/000-8.jpeg_/blockchain-event-00.jpeg",
            "height": "48"
        },
        "height": "48"
    },
    "created": "2018-06-30 07:06:02",
    "venue_id": "V0-001-001458366-0",
    "tz_city": null,
    "stop_time": null,
    "venue_name": "Union Square",
    "venue_url": "http://sanfrancisco.eventful.com/venues/union-square-/V0-001-001458366-0?utm_source=apis&utm_medium=apim&utm_campaign=apic"
}
var event4 = {
    "watching_count": null,
    "olson_path": "America/Los_Angeles",
    "calendar_count": null,
    "comment_count": null,
    "region_abbr": "CA",
    "postal_code": null,
    "going_count": null,
    "all_day": "0",
    "latitude": "37.9522",
    "groups": null,
    "url": "http://sanfrancisco.eventful.com/events/marin-/E0-001-109286462-3?utm_source=apis&utm_medium=apim&utm_campaign=apic",
    "id": "E0-001-109286462-3",
    "privacy": "1",
    "city_name": "Kentfield",
    "link_count": null,
    "longitude": "-122.556",
    "country_name": "United States",
    "country_abbr": "USA",
    "region_name": "California",
    "start_time": "2018-09-15 18:00:00",
    "tz_id": null,
    "description": " Astounding technology is about to become commonplace, and it will change everything. Where radical advancements reconfigure the convergence between our humanity and the technology we wield, we may need to rethink our search for meaning, joy, profession, health and purpose. Our annual show will explore the pitfalls and promises of our technology-infused future. Nanotechnology and embedded sensors promise to augment our capabilities; blockchain and crypto-currencies could upend the ways we track ownership, distribute commodities, and manage wealth; gene science moves to rewrite the limitations of our heredity; immersive VR and telepresence redefines the real; and robotics, automation, and AI forces a hard rethink of jobs held by man and machine. From the molecular to the grand, the many new ways we’ll engage with technology are creating a changing experience of our very identity.<p>TEDxMarin 2018 will offer a big picture view of this emerging coexistence, and bring inspiration to our Bay Area community with thought-provoking insights and ideas how we’ll live, work and thrive in the world to come.</p>",
    "modified": "2018-06-06 23:58:20",
    "venue_display": "1",
    "tz_country": null,
    "performers": null,
    "title": "Marin",
    "venue_address": null,
    "geocode_type": "City Based GeoCodes",
    "tz_olson_path": null,
    "recur_string": null,
    "calendars": null,
    "owner": "evdb",
    "going": null,
    "country_abbr2": "US",
    "image": null,
    "created": "2017-12-01 08:33:08",
    "venue_id": "V0-001-012115245-6",
    "tz_city": null,
    "stop_time": null,
    "venue_name": "The College of Marin",
    "venue_url": "http://sanfrancisco.eventful.com/venues/the-college-of-marin-/V0-001-012115245-6?utm_source=apis&utm_medium=apim&utm_campaign=apic"
}
var event5 = {
    "watching_count": null,
    "olson_path": "America/Los_Angeles",
    "calendar_count": null,
    "comment_count": null,
    "region_abbr": "CA",
    "postal_code": "94102",
    "going_count": null,
    "all_day": "0",
    "latitude": "37.7826737",
    "groups": null,
    "url": "http://sanfrancisco.eventful.com/events/city-impact-conference-2018-/E0-001-115345036-7?utm_source=apis&utm_medium=apim&utm_campaign=apic",
    "id": "E0-001-115345036-7",
    "privacy": "1",
    "city_name": "San Francisco",
    "link_count": null,
    "longitude": "-122.410428",
    "country_name": "United States",
    "country_abbr": "USA",
    "region_name": "California",
    "start_time": "2018-07-14 09:00:00",
    "tz_id": null,
    "description": "City Impact Conference is a ONE DAY experience filled with worship and Biblical justice by immediately hitting the streets of the Tenderloin (inner city of San Francisco) to engage in 45+ outreaches. Join Hillsong San Francisco and THOUSANDS of people to gather and scatter to INTERVENE on behalf of the people in the Tenderloin district as one body!",
    "modified": "2018-06-27 09:58:47",
    "venue_display": "1",
    "tz_country": null,
    "performers": null,
    "title": "City Impact Conference 2018",
    "venue_address": "982 Market St",
    "geocode_type": "EVDB Geocoder",
    "tz_olson_path": null,
    "recur_string": null,
    "calendars": null,
    "owner": "communicationsbcc7d",
    "going": null,
    "country_abbr2": "US",
    "image": {
        "small": {
            "width": "48",
            "url": "//d1marr3m5x4iac.cloudfront.net/images/small/I0-001/040/580/815-8.jpeg_/city-impact-conference-2018-15.jpeg",
            "height": "48"
        },
        "width": "48",
        "caption": null,
        "medium": {
            "width": "128",
            "url": "//d1marr3m5x4iac.cloudfront.net/images/medium/I0-001/040/580/815-8.jpeg_/city-impact-conference-2018-15.jpeg",
            "height": "128"
        },
        "url": "//d1marr3m5x4iac.cloudfront.net/images/small/I0-001/040/580/815-8.jpeg_/city-impact-conference-2018-15.jpeg",
        "thumb": {
            "width": "48",
            "url": "//d1marr3m5x4iac.cloudfront.net/images/thumb/I0-001/040/580/815-8.jpeg_/city-impact-conference-2018-15.jpeg",
            "height": "48"
        },
        "height": "48"
    },
    "created": "2018-06-15 16:56:15",
    "venue_id": "V0-001-011187227-8",
    "tz_city": null,
    "stop_time": "2018-07-14 19:00:00",
    "venue_name": "The Warfield Theater",
    "venue_url": "http://sanfrancisco.eventful.com/venues/the-warfield-theater-/V0-001-011187227-8?utm_source=apis&utm_medium=apim&utm_campaign=apic"
}

//
// function displayCardDeck(){
//     var $cardDeck = $('.events-grid')
//     events = [event1, event2, event3]
//
//     events.forEach(function(event){
//         var cardObj = new Card(event);
//         $cardDeck.append(cardObj.createCard())
//     })
// }
// $(document).ready(function() {
//     displayCardDeck()
// })