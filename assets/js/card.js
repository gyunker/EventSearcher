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
        this.url = event.url
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
        var linkTo = $('<a>', {
            href: this.url,
            target: "_blank",
        }).append( $("<h4>").text(this.title))
        $header.append(linkTo)
        return $header

    }
    img(){
        // <img class="card-img-top" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src=" " >
        if(_isEmpty(this.image)){
            console.log('Image is Null')
            return ""

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
        var linkTo = $('<a>', {
            href: this.url,
            target: "_blank"
        }).append(img)

        return linkTo
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
        var $tags = $('<div>').addClass("tags text-mutted")
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

