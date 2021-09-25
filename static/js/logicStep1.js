// Add console.log to see if our code is working on Chrome
console.log("working");

// Create the map object with a center and zoom level.
// Method 1
// let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // other mapbox id: mapbox/outdoors-v11, mapbox/light-v10, mapbox/dark-v10, 
    // mapbox/satellite-v9, mapbox/satellite-streets-v11
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

// We create the DARK tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps. 
let baseMaps = {
    "Streets": streets,
    "SatelliteStreets": satelliteStreets
};
// // Then we add our 'streets' tile layer to the map.
// streets.addTo(map);

//  Method 2
// Create the map object with a center, zoom level and default layer to Toronto.
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
// let torontoHoods = "https://raw.githubusercontent.com/fmohiudd/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Create a style for the lines.
// let myStyle = {
//     color: "#ffaaff", 
//     weight: 1
// };
// Grabbing our GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data).addTo(map);
});



