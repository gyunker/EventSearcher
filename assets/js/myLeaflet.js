/* This is the leaflet library */
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic2hhbGx5ZyIsImEiOiJjampna250YnkwMWI5M3ZzNGJwcmpxOWQ1In0.921JpJzWVBluf1MAzRmtzA'
}).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);
