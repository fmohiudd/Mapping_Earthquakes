// Add console.log to see if our code is working on Chrome
console.log("working");

// Create the map object with a center and zoom level.
// Method 1
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

// // Method 2
// let map = L.map('mapid', {
//     center: [
//         40.7, -94.5
//     ],
//     zoom: 4
// });

// We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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

// Add a circle to the map for Los Angeles instead of a marker.
// L.circle([34.0522, -118.2437], {
//     // radius: 100
//     color: 'yellow',
//     radius:300
// }).addTo(map);

// Another way to add a circle to the map
L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    color: "black",
    fillColor: '#ffffa1'
}).addTo(map);



// Then we add our 'graymap' tile layer to the map.
// Just checking
streets.addTo(map);