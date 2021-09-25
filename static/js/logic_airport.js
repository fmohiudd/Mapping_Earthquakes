// Add console.log to see if our code is working on Chrome
console.log("working");

// Create the map object with a center and zoom level.
// Method 1
let map = L.map('mapid').setView([37.6213, -122.3790], 4);

// Coordinates for each point to be used in the line. 

let line = [
    [37.615223, -122.389977],  // SFO
    [30.18999924, -97.668663],  // AUS in Texas
    [43.67771, -79.621622],      // Toronto 
    [40.641766, -73.780968]     // JFK
];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
    color: "blue",
    dashArray: '6, 6',
    weight: '2',
    opcity: '0.5'    
}).addTo(map);

// // Method 2
// let map = L.map('mapid', {
//     center: [
//         40.7, -94.5
//     ],
//     zoom: 4
// });

// We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    // other mapbox id: mapbox/outdoors-v11, mapbox/light-v10, mapbox/dark-v10, 
    // mapbox/satellite-v9, mapbox/satellite-streets-v11
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

// // Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// To add multiple markers:the lat and log are nested in an array
// We need to iterate through the array and add each lat & long.

//Get data from cities.js
let cityData = cities;


// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    console.log(city)
    // L.marker(city.location)
    // .bindPopup("<h2>" + city.city + ", " + city.state +  "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    // .addTo(map)

    // Add a circle marker with city population as the circle size.
    L.circleMarker(city.location, {
        radius: city.population/100000
    })
    .bindPopup("<h2>" + city.city + ", " + city.state +  "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map)
});

// Then we add our 'graymap' tile layer to the map.
// Just checking
streets.addTo(map);